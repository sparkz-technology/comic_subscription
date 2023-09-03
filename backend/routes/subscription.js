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
    body("password").trim().isLength({ min: 5 }),
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
router.post("/reset-password", subscriptionController.postPasswordReset);

module.exports = router;
