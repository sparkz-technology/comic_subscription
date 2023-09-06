const express = require("express");
const passport = require("passport");
const router = express.Router();

const authController = require("../controllers/auth");
router.get(
  "/google",
  passport.authenticate(
    "google",
    { scope: ["profile", "email"] },
    authController.googleAuth
  )
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleAuthCallback
);

module.exports = router;
