const pg = require('pg')
require("dotenv").config();
var client = new pg.Client(process.env.CONN); //Connection string here
client.connect(function(err){
  if (err) {
    console.log("Database connection error");
    console.log(err)
  }else
  {
    console.log("Database connected successfully");
  }
  
})

module.exports = client;