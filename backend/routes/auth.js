const express = require("express");
const passport = require("passport");
const router = express.Router();
const axios = require("axios");

const authController = require("../controllers/auth");

router.post("/google", authController.googleLogin);

module.exports = router;
