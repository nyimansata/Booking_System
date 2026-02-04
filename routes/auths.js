const express = require("express");
const { Register, Login, Logout } = require("../controllers/auth");

const router = express.Router();

router.post("/register", Register);

router.post("/login", Login);

router.post("/logout", Logout);

module.exports = router;
