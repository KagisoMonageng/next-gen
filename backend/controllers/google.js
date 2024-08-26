const passport = require('passport');
require("dotenv").config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_KEY = process.env.CLIENT_KEY;


passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_KEY,
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Logic to handle user data
  return done(null, profile);
}));

console.log('Google strategy registered');

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
