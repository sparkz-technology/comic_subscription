const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const User = require("../models/user");
const Auth = require("../middlewares/is-Auth");
const subscriptionController = require("../controllers/subscription");

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

module.exports = router;
