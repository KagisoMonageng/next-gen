const express = require("express");
const auth_controller = require("../controllers/auth-controller");
const passport = require('passport');
const router = express.Router();




//AUTH ENDPOINT PATHS

router.post('/login', auth_controller.login)
router.post('/register', auth_controller.register)

router.post('/google',auth_controller.googleAuth)

// Google OAuth callback route
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home or send a response
    res.json({ token: req.user });
  }
);


module.exports = router;