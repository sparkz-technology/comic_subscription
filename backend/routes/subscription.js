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
// router.get(
//   "/get-subscription-details",
//   subscriptionController.getSubscriptionDetails
// );

module.exports = router;
// // server.js
// //
// // Use this sample code to handle webhook events in your integration.
// //
// // 1) Paste this code into a new file (server.js)
// //
// // 2) Install dependencies
// //   npm install stripe
// //   npm install express
// //
// // 3) Run the server on http://localhost:4242
// //   node server.js

// // The library needs to be configured with your account's secret key.
// // Ensure the key is kept out of any version control system you might be using.
// const stripe = require('stripe')('sk_test_...');
// const express = require('express');
// const app = express();

// // This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = "whsec_885450b317c7eb3d2fe6a111f161fa293b40e8a9c9b99a2d0fa81fa9bee46419";

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'customer.subscription.created':
//       const customerSubscriptionCreated = event.data.object;
//       // Then define and call a function to handle the event customer.subscription.created
//       break;
//     case 'customer.subscription.deleted':
//       const customerSubscriptionDeleted = event.data.object;
//       // Then define and call a function to handle the event customer.subscription.deleted
//       break;
//     case 'invoice.payment_failed':
//       const invoicePaymentFailed = event.data.object;
//       // Then define and call a function to handle the event invoice.payment_failed
//       break;
//     case 'invoice.payment_succeeded':
//       const invoicePaymentSucceeded = event.data.object;
//       // Then define and call a function to handle the event invoice.payment_succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });

// app.listen(4242, () => console.log('Running on port 4242'));
