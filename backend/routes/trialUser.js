const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const TrialUser = require("../models/trialUser");

const trialUserController = require("../controllers/trialUser");

router.post(
  "/user",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(
        async (value) =>
          await TrialUser.findOne({ email: value }).then((userDoc) => {
            if (userDoc) {
              return Promise.reject(new Error("Free trial exist"));
            }
          })
      ),
  ],
  trialUserController.postUser
);
module.exports = router;
