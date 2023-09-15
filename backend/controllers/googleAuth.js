const Axios = require("axios");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const stripe = require("stripe")(config.stripe_secret_key);

const User = require("../models/user");

exports.google = async (req, res, next) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      const error = new Error("No access token");
      error.statusCode = 400;
      throw error;
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
    // set err for token expired or invalid

    const userData = response.data;

    if (!userData) {
      const error = new Error("No user data");
      error.statusCode = 400;
      throw error;
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
      message: "User logged in successfully",
      token,
      user: { email, name, picture },
      customerId: user.customerId,
      role: user.role,
    });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      error.message = error.response.data.error.message;
      error.statusCode = error.response.data.error.code;
    }
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
