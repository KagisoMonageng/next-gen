const express = require("express");
const auth_controller = require("../controllers/auth-controller");

const router = express.Router();


//AUTH ENDPOINT PATHS

router.post('/login', auth_controller.login)
router.post('/register', auth_controller.register)


module.exports = router;