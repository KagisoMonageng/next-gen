const pg = require('pg')
require("dotenv").config();
var client = new pg.Client('postgresql://postgres:postgres@13.48.44.148:5432/nextGen'); //Connection string here
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
