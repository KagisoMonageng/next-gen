require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../config/db-config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
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
            process.env.SECRET_KEY, {
            expiresIn: '24h',
            algorithm: 'HS256'
          }
          );
          res.status(200).json({
            message: "Welcome back! " + user.name,
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
  const last_login = new Date().getFullYear() + "-" + new Date().getMonth() + 1 + "-" + new Date().getDate();
  console.log(last_login)
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
            name, surname, email, hash, profile_image, profile_banner, last_login, short_bio
          ],
          (err, results) => {
            if (err) {
              flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
              console.log(err)
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
                process.env.SECRET_KEY, {
                expiresIn: '24h',
                algorithm: 'HS256'
              });

              res.status(201).json({ message: 'You are now registered', token: token });

            }
          }
        );

      });
    }
  } catch (err) {
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

    db.query('SELECT * FROM users WHERE email = $1', [email], (err, results) => {
      if (err) {
        res.status(500).json({
          message: "Failed to fetch users"
        });
      } else {
        if (results.rowCount > 0) {
          fsurname = name.substring(name.indexOf(" "))
          fname = name.substring(0, name.indexOf(" "))
          const tokenJwt = jwt.sign(
            {
              email: email,
              id: userid,
              name: fname,
              surname: fsurname,
              short_bio: results.rows[0].short_bio,
              profile_image: profile_image,
              profile_banner: results.rows[0].short_bio,
            },
            process.env.SECRET_KEY, {
            expiresIn: '24h',
            algorithm: 'HS256'
          }
          );
          res.status(200).json({
            message: "Welcome back! " + name,
            token: tokenJwt
          });
        } else {
          const last_login = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
          const short_bio = 'Hey there, I am new on NextGen'
          const profile_banner = "https://res.cloudinary.com/dkvrb3pye/image/upload/v1675240135/vecteezy_profile-user-icon-isolated-on-white-background-vector-eps10__a4gxpc.jpg";

          fsurname = name.substring(name.indexOf(" "));
          fname = name.substring(0, name.indexOf(" "));
          db.query(`INSERT INTO Users (name,surname,email, password,profile_image,profile_banner,last_login,short_bio) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
            [
              fname, fsurname, email, 'Google Authentication', profile_image, profile_banner, last_login, short_bio
            ], (dbErr, dbResults) => {
              if (err) {
                res.status(401).json({
                  message: "Failed to save user"
                });
              } else {
                const tokenJwt = jwt.sign(
                  {
                    email: email,
                    id: userid,
                    name: fname,
                    surname: fsurname,
                    short_bio: short_bio,
                    profile_image: profile_image,
                    profile_banner: profile_banner
                  },
                  process.env.SECRET_KEY, {
                  expiresIn: '24h',
                  algorithm: 'HS256'
                }
                );
                res.status(200).json({
                  message: "Welcome back! " + name,
                  token: tokenJwt
                });
              }
            })


        }
      }
    })

  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
}

exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  const sql = "SELECT * FROM users WHERE email = $1";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error occurred while fetching user!" });
    }
    if (results.rows.length === 0) {
      return res.status(400).json({ message: "User not found!" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
    const resetLink = `${process.env.CLIENT}/reset-password?key=${token}`;

    const sqlUpdate = "UPDATE users SET reset_token = $1, token_exp = $2 WHERE email = $3";
    db.query(sqlUpdate, [token, expires, email], async (err, updateResults) => {
      if (err) {
        return res.status(500).json({ message: "Database error occurred while updating user!" });
      } else {
        await sendEmail(
          results.rows[0].email,
          "Password Reset Request",
          resetHTML(resetLink, results.rows[0].name)
        );
        return res.status(200).json({ message: "Password reset link sent to email." });
      }
    });
  })

}


const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    auth: {
      user: "griend.gamer@zohomail.com", //
      pass: "MusicIsLife@44", //
    },
  });


  await transporter.sendMail({ from: "griend.gamer@zohomail.com", to, subject, html });
};


function resetHTML(resetLink, userName) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; background-color: #f9f9f9; border-radius: 8px; color: #333;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #ffa400; margin-bottom: 10px;">Reset Your Password</h2>
        <p style="font-size: 16px; margin: 0;">Hi ${userName},</p>
      </div>

      <p style="font-size: 15px; line-height: 1.6;">
        We received a request to reset your password for your account. Click the button below to proceed. 
        This link will expire in <strong>10 minutes</strong>.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" 
           style="background-color: #ffa400; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
          Reset Password
        </a>
      </div>

      <p style="font-size: 14px; line-height: 1.6;">
        If you didn’t request this, no action is needed. Your password will remain unchanged.
      </p>

      <p style="font-size: 14px; margin-top: 40px;">
        Kind regards,<br/>
        <strong>NextGen Team</strong>
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

      <footer style="font-size: 12px; color: #777; text-align: center;">
        &copy; ${new Date().getFullYear()} NextGen. All rights reserved.
      </footer>
    </div>
  `;
}


exports.verifyResetToken = async (req, res) => {
  const { token } = req.params;
  const sql = "SELECT * FROM users WHERE reset_token = $1 AND token_exp > $2";
  db.query(sql, [token, Date.now()], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error occurred while verifying token!" });
    }
    if (results.rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired reset token!" });
    }
    return res.status(200).json({ message: "Reset token validated", userId: results.rows[0].id });
  });
}

exports.updatePassword = async (req, res) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).json({ message: "Missing user ID or new password." });
  }

  bcrypt.hash(password, 10, (errHash, hashedPassword) => {
    if (errHash) {
      return res.status(500).json({ message: "Error hashing password!" });
    }

    const sql = "UPDATE users SET password = $1, reset_token = NULL, token_exp = NULL WHERE id = $2";
    db.query(sql, [hashedPassword, userId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error occurred while updating password!" });
      }
      return res.status(200).json({ message: "Password updated successfully!" });
    });
  });
};




exports.updateProfileImage = async (req, res) => {
  const userId = req.params.id; // Assuming user ID is passed as a URL parameter
  const url = req.body.url;
  if (!userId || !url) {
    return res.status(400).json({ message: "Missing user ID or new profile image." });
  }

  const sql = "UPDATE users SET profile_image = $1 WHERE id = $2 RETURNING *";
    db.query(sql, [url, userId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error occurred while updating profile image!" });
      }

      const user = results.rows[0];
      const token = jwt.sign(
            {
              email: user.email,
              id: user.id,
              name: user.name,
              surname: user.surname,
              short_bio: user.short_bio,
              profile_image: user.profile_image,
              profile_banner: user.profile_banner
            },
            process.env.SECRET_KEY, {
            expiresIn: '24h',
            algorithm: 'HS256'
          }
          );
          
      return res.status(200).json({
            message: "Profile image updated successfully!",
            token: token
          }); 
    });
};


