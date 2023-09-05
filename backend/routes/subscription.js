const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const User = require("../models/user");
const Auth = require("../middlewares/is-Auth");
const subscriptionController = require("../controllers/subscription");

router.post(
  "/create-customer",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value) =>
        User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(new Error("Email already exists"));
          }
        })
      ),
    body("password")
      .trim()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
      .withMessage(
        "Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter"
      ),
  ],
  subscriptionController.postCreateCustomer
);
router.post(
  "/retrieve-customer",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").trim().isLength({ min: 5 }),
  ],
  subscriptionController.postRetrieveCustomer
);
router.post(
  "/create-subscription",
  Auth,
  subscriptionController.postSubscription
);
router.get(
  "/get-subscription-details",
  Auth,
  subscriptionController.getSubscriptionDetails
);
router.post(
  "/cancel-subscription",
  Auth,
  subscriptionController.postCancelSubscription
);
router.post(
  "/reset-password-request",
  subscriptionController.postRequestPasswordReset
);
router.post(
  "/verify-reset-token/:resetToken",
  subscriptionController.postVerifyResetToken
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
  subscriptionController.postPasswordReset
);

module.exports = router;
