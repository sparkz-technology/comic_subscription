const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const passport = require("passport");
const stripe = require("stripe")(config.stripe_secret_key);

const User = require("../models/user");

// Define Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_client_id,
      clientSecret: config.google_client_secret,
      callbackURL: "http://localhost:8000/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create the user by their Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Create a new user if not found
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            // Add other user properties as needed
          });
          await user.save();
        }

        // Generate a JWT token
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id.toString(),
            passwordResetCount: user.passwordResetCount,
          },
          config.jwt_secret,
          {
            expiresIn: config.jwt_expires_in,
          }
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
// Handle Google OAuth callback
exports.googleAuthCallback = async (req, res, next) => {
  if (!req.user) {
    const error = new Error("User not authenticated");
    error.statusCode = 401;
    throw error;
  }

  // Assuming you set req.user.error in case of an error during authentication
  if (req.user.error) {
    const error = new Error(req.user.error);
    error.statusCode = 401;
    throw error;
  }

  try {
    const user = await User.findOne({ googleId: req.user.user.googleId });

    if (!user.customerId) {
      console.log("Creating a new customer in Stripe");
      // Create a new customer in Stripe and associate the customerId with the user
      const customer = await stripe.customers.create({
        email: user.email,
        // You can add more Stripe customer attributes here
      });

      // Update the user document with the customerId
      await User.updateOne(
        { googleId: req.user.user.googleId },
        { customerId: customer.id }
      );
      console.log("Customer created in Stripe:", customer.id); // Log the customer ID

      // Update the user object with the customerId
      user.customerId = customer.id;
    }

    // Check if the customerId is set correctly
    if (!user.customerId || typeof user.customerId !== "string") {
      console.error("Invalid customerId:", user.customerId);
      throw new Error("Invalid customerId");
    }

    // Retrieve customer information from Stripe
    const customer = await stripe.customers.retrieve(user.customerId);
    console.log("Customer retrieved from Stripe:", customer);

    // Redirect to a success page or return a success JSON response
    res.json({
      message: "User successfully authenticated",
      user: req.user.user.googleId,
      token: req.user.token,
      customer: customer,
    });
  } catch (error) {
    // Handle errors here
    if (error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
