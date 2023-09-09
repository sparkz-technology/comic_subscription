const express = require("express");
const router = express.Router();

const googleAuthController = require("../controllers/googleAuth");

router.post("/google", googleAuthController.google);
module.exports = router;
