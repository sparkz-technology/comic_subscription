const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/user");

const stripeController = require("../controllers/stripeAuth");

router.post(
  "/create-customer",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value) =>
        User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            if (userDoc.accountType === "google") {
              return Promise.reject(new Error("Please login with google"));
            }
            return Promise.reject(new Error("Email already exists"));
          }
        })
      ),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
      .withMessage(
        "Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter"
      ),
  ],
  stripeController.postCreateCustomer
);
router.post(
  "/retrieve-customer",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").trim().isLength({ min: 5 }),
  ],
  stripeController.postRetrieveCustomer
);
router.post(
  "/reset-password-request",
  stripeController.postRequestPasswordReset
);
router.post(
  "/verify-reset-token/:resetToken",
  stripeController.postVerifyResetToken
);
router.post(
  "/reset-password",
  [
    body("password")
      .trim()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
      .withMessage(
        "Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter"
      ),
  ],
  stripeController.postPasswordReset
);

module.exports = router;
