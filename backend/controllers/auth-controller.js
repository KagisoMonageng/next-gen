require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../config/db-config");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const data = await db.query("SELECT * FROM users WHERE email= $1", [
        email,
      ]); //Verifying if the user exists in the database
      const user = data.rows[0];
      if (data.rows.length === 0) {
        res.status(400).json({
          message: "User is not registered, Register first",
        });
      } else {
        console.log(user.password)
        bcrypt.compare(password, user.password, (err, result) => {
          //Comparing the hashed password
          if (err) {
            res.status(500).json({
              message: "Encryption failed",
            });
          } else if (result === true) {
            //Checking if credentials match
            const token = jwt.sign(
              {
                email: email,
                id: user.id,
                name: user.name,
                surname: user.surname,
                short_bio: user.short_bio,
                profile_image: user.profile_image,
                profile_banner: user.profile_banner
              },
              process.env.SECRET_KEY,{
                  expiresIn:'24h',
                  algorithm:'HS256'
              }
            );
            res.status(200).json({
              message: "Welcome back! "+user.name,
              token: token
            });
          } else {
            //Declaring the errors
            if (result != true)
              res.status(400).json({
                message: "Incorect login credentials",
              });
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Database error occurred while signing in!", //Database connection error
      });
    }
  };

//Registration Function
exports.register = async (req, res) => {
  const { name, email, surname, password } = req.body;

  const profile_image = "https://res.cloudinary.com/dkvrb3pye/image/upload/v1675240135/vecteezy_profile-user-icon-isolated-on-white-background-vector-eps10__a4gxpc.jpg";
  const profile_banner = "https://res.cloudinary.com/dkvrb3pye/image/upload/v1675240135/vecteezy_profile-user-icon-isolated-on-white-background-vector-eps10__a4gxpc.jpg";
  const last_login = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
  const short_bio = 'Hey there, I am new on NextGen'

  try {
    const data = await db.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]); //Checking if user already exists
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        message: "Email already exists, Please log in",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            message: "Server error",
          });
        var flag = 1; //Declaring a flag

        //Inserting data into the database

        db.query(
          `INSERT INTO Users ( name,surname,email, password,profile_image,profile_banner,last_login,short_bio) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
          [
            name,surname,email, hash ,profile_image,profile_banner,last_login,short_bio
          ],
          (err,results) => {
            if (err) {
              flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
              console.error(err);
              return res.status(500).json({
                message: "Database error",
              });
            } else {
              flag = 1;
              const token = jwt.sign(
                //Signing a jwt token
                {
                    email: email,
                    id: results.rows[0].id,
                    name: name,
                    surname: surname,
                    short_bio: short_bio,
                    profile_image: profile_image,
                    profile_banner: profile_banner
                  },
                  process.env.SECRET_KEY,{
                    expiresIn:'24h',
                    algorithm:'HS256'
                });
              
              res.status(201).json({message:'You are now registered',token:token});

            }
          }
        );
       
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Database error while registring user!", //Database connection error
    });
  }
};

exports.googleAuth = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    const email = payload['email'];
    const name = payload['name'];
    const profile_image = payload['picture'];
    // Process the user's information (e.g., create a session or JWT)
    const tokenJwt = jwt.sign(
      {
        email: email,
        id: userid,
        name: name,
        surname: null,
        short_bio: null,
        profile_image: profile_image,
        profile_banner: null
      },
      process.env.SECRET_KEY,{
          expiresIn:'24h',
          algorithm:'HS256'
      }
    );
    res.status(200).json({
      message: "Welcome back! "+ name,
      token: tokenJwt
    });  
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Token is invalid' });
  }
}

