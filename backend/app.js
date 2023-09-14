const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config/config");

// Configure CORS middleware

const trialUserRoutes = require("./routes/trialUser"); // user routes
const subscriptionRoutes = require("./routes/subscription"); // subscription routes
const webhookRoutes = require("./routes/webhook"); // webhook routes (Stripe)
const googleAuthRoutes = require("./routes/googleAuth"); // google auth routes
const stripeAuthRoutes = require("./routes/stripeAuth"); // stripe auth routes
const adminRoutes = require("./routes/admin"); // admin routes
const errorHandler = require("./middlewares/error"); // error handler middleware
// Configure CORS middleware
const stripeWebhookOrigin = config.stripe_webhook_orgin; // Stripe's origin for webhook requests
const origin = "http://localhost:5173"; // Frontend's origin
const googleOrigin = "https://accounts.google.com/*";
const authOrgin = "https://accounts.google.com/o/oauth2/v2/auth/*";
// set origin to * to allow all origins
// set origin to * to allow all origins
app.use(
  cors({
    origin: [stripeWebhookOrigin, origin, googleOrigin, authOrgin],
    credentials: true, // Allow credentials (cookies, sessions) to be sent with the request
    methods: ["POST", "GET", "OPTIONS"], // Specify the allowed HTTP methods
    optionsSuccessStatus: 204, // Return a successful response for all CORS requests
  })
);

app.use(cookieParser());
if (config.env === "development") {
  app.use(morgan("dev"));
}
// express.raw is used to parse the incoming request bodies in a middleware before you handle it
app.use("/webhook", express.raw({ type: "application/json" }), webhookRoutes); // webhook routes (Stripe
//body parser is used to parse the incoming request bodies in a middleware before you handle it
// Parse JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
// for form data parsing  app.use(express.urlencoded({ extended: true }));
app.use("/trial", trialUserRoutes); // user routes
app.use("/subscription", subscriptionRoutes); // subscription routes
app.use("/auth", googleAuthRoutes); // google auth routes
app.use("/stripe", stripeAuthRoutes); // stripe auth routes
app.use("/admin", adminRoutes); // admin routes
app.use(errorHandler); // error handler middleware

module.exports = app;
