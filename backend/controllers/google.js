const passport = require('passport');
require("dotenv").config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');



passport.use(new GoogleStrategy({
  clientID: '295049434949-bdb1ue7dpca36ja02rocs3n5hbdg7lo0.apps.googleusercontent.com',
  clientSecret: 'OCSPX-4eRar_h_LF-H7MJwDSwbVr90tzny',
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