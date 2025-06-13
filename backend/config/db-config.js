const pg = require('pg')
require("dotenv").config();
// var client = new pg.Client(process.env.POSTGRES_URL); // Connection string here
var client = new pg.Client({
  host:'localhost',
  port:5433,
  database:'next-gen-local',
  user:'admin',
  password:'nimda'
})
client.connect(function(err){
  if (err) {
    console.log("Database connection error");
    console.log(err)
  }else{
    console.log("Database connected successfully");
  }
  
})

module.exports = client;
