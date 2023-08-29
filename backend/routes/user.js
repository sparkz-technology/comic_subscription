const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const TrialUser = require("../models/trialUser");

const userController = require("../controllers/user");

router.post(
  "/user",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value) =>
        TrialUser.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(new Error("Free trial exist"));
          }
        })
      ),
  ],
  userController.postUser
);
module.exports = router;
