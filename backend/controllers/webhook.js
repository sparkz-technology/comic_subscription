const config = require("../config/config");

const { subscription } = require("../microservices/subscription");
const User = require("../models/user");
const stripe = require("stripe")(config.stripe_secret_key);
const endpointSecret =
  "whsec_885450b317c7eb3d2fe6a111f161fa293b40e8a9c9b99a2d0fa81fa9bee46419";

// Function to format date
function formattedDate(date) {
  const current_period_end = new Date(date * 1000);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  };
  return current_period_end.toLocaleString("en-US", options);
}

// Webhook function
exports.webhook = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    console.log("Webhook Error: ", err.message);
    return;
  }

  let current_period_end;

  // Handle the event based on event type
  switch (event.type) {
    case "customer.subscription.created":
      const subscriptionCreated = event.data.object;
      current_period_end = formattedDate(
        subscriptionCreated.current_period_end
      );
      try {
        const user = await User.findOne({
          customerId: subscriptionCreated.customer,
        });
        user.subscriptionStatus = subscriptionCreated.status;
        user.subscriptionId = subscriptionCreated.id;
        user.Current_period_end = current_period_end;
        await user.save();
      } catch (err) {
        console.log(err, "customer.subscription.created");
      }
      break;

    case "customer.subscription.deleted":
      const subscriptionDeleted = event.data.object;
      try {
        const userDeleted = await User.findOne({
          customerId: subscriptionDeleted.customer,
        });
        userDeleted.subscriptionStatus = subscriptionDeleted.status;
        await userDeleted.save();
        await subscription("cancelSubscription", userDeleted);
        console.log("Subscription cancelled", "👎");
      } catch (err) {
        console.log(err, "customer.subscription.deleted");
      }
      break;

    case "customer.subscription.updated":
      const subscriptionUpdated = event.data.object;
      current_period_end = formattedDate(
        subscriptionUpdated.current_period_end
      );
      try {
        const userUpdated = await User.findOne({
          customerId: subscriptionUpdated.customer,
        });
        if (userUpdated) {
          userUpdated.subscriptionStatus =
            subscriptionUpdated.status || "active";
          userUpdated.Current_period_end = current_period_end;
          await userUpdated.save();
        }
      } catch (err) {
        console.log(err, "customer.subscription.updated");
      }
      break;

    case "charge.succeeded":
      const chargeSucceeded = event.data.object;
      try {
        const userCharge = await User.findOne({
          customerId: chargeSucceeded.customer,
        });
        userCharge.subscriptionStatus = chargeSucceeded.status;
        userCharge.last4 = chargeSucceeded.payment_method_details.card.last4;
        await userCharge.save();
      } catch (err) {
        console.log(err, "charge.succeeded");
      }
      break;

    case "invoice.payment_succeeded":
      const invoicePaymentSucceeded = event.data.object;
      try {
        const userInvoicePaymentSucceeded = await User.findOne({
          customerId: invoicePaymentSucceeded.customer,
        });
        userInvoicePaymentSucceeded.subscriptionStatus =
          invoicePaymentSucceeded.status;
        await userInvoicePaymentSucceeded.save();
        subscription("subscription", userInvoicePaymentSucceeded);
        console.log("Subscription renewed" + " " + "🎉");
      } catch (err) {
        console.log(err, "invoice.payment_succeeded");
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};
