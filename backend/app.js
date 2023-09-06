const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config/config");
const passport = require("passport");

// Configure CORS middleware
const stripeWebhookOrigin = config.stripe_webhook_orgin; // Stripe's origin for webhook requests
const origin = "http://localhost:5173"; // Frontend's origin
const googleOrigin = "https://accounts.google.com";
const authOrgin = "http://localhost:8000/auth/google";
// set origin to * to allow all origins
// const origin = "*";
app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: [origin, stripeWebhookOrigin, googleOrigin, authOrgin],
    credentials: true, // Allow credentials (cookies, sessions) to be sent with the request
    methods: ["POST", "GET", "OPTIONS"], // Specify the allowed HTTP methods
  })
);

// Initialize and configure Passport.js

app.use(
  session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
if (config.env === "development") {
  app.use(morgan("dev"));
}

const trialUserRoutes = require("./routes/trialUser"); // user routes
const subscriptionRoutes = require("./routes/subscription"); // subscription routes
const webhookRoutes = require("./routes/webhook"); // webhook routes (Stripe)
const authRoutes = require("./routes/auth");
const errorHandler = require("./middlewares/error"); // error handler middleware

app.use("/webhook", express.raw({ type: "application/json" }), webhookRoutes); // webhook routes (Stripe
app.use(bodyParser.json()); // parse application/json
app.use("/trial", trialUserRoutes); // user routes
app.use("/subscription", subscriptionRoutes); // subscription routes
app.use("/auth", authRoutes);
app.use(errorHandler); // error handler middleware

module.exports = app;
