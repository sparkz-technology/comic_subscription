const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const config = require("./config/config");

// Configure CORS middleware
const stripeWebhookOrigin = "https://hooks.stripe.com"; // Stripe's origin for webhook requests

app.use(
  cors({
    origin: ["http://localhost:5173", stripeWebhookOrigin],
    credentials: true,
  })
);

app.use(cookieParser());
if (config.env === "development") {
  app.use(morgan("dev"));
}

const userRoutes = require("./routes/user"); // user routes
const subscriptionRoutes = require("./routes/subscription"); // subscription routes
const webhookRoutes = require("./routes/webhook"); // webhook routes (Stripe)
const errorHandler = require("./middlewares/error"); // error handler middleware

app.use("/webhook", express.raw({ type: "application/json" }), webhookRoutes); // webhook routes (Stripe
app.use(bodyParser.json()); // parse application/json
app.use("/trial", userRoutes); // user routes
app.use("/subscription", subscriptionRoutes); // subscription routes
app.use(errorHandler); // error handler middleware

module.exports = app;
