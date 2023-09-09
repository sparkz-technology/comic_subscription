const Axios = require("axios");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const stripe = require("stripe")(config.stripe_secret_key); // Replace with your actual Stripe API key

const User = require("../models/user");

exports.googleLogin = async (req, res, next) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res
        .status(400)
        .json({ success: false, message: "No access token" });
    }

    // Make the API request with the accessToken
    const response = await Axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userData = response.data;

    if (!userData) {
      return res.status(400).json({ success: false, message: "No user data" });
    }

    const { email, name, picture } = userData;

    let user = await User.findOne({ email });

    if (!user) {
      const customer = await stripe.customers.create({ email });
      user = new User({
        email,
        customerId: customer.id,
        accountType: "google",
      });
      await user.save();
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
        passwordResetCount: user.passwordResetCount,
      },
      config.jwt_secret,
      { expiresIn: config.jwt_expires_in }
    );

    res.status(200).json({
      success: true,
      token,
      user: { email, name, picture },
      customerId: user.customerId,
    });
  } catch (error) {
    console.error("Error fetching user data from Google:", error);
    const stack = error.stack;
    res.status(500).json({ success: false, stack });
  }
};
