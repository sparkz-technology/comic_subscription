const config = require("../config/config");
const User = require("../models/user");
const stripe = require("stripe")(config.stripe_secret_key);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const crypto = require("crypto");

const { subscription } = require("../microservices/subscription");

exports.postCreateCustomer = async (req, res, next) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const hashedPw = await bcrypt.hash(password, 12);
    const customer = await stripe.customers.create({ email: email });
    const user = new User({
      email: email,
      password: hashedPw,
      customerId: customer.id,
    });
    await user.save();
    res.status(201).json({ customer: customer, message: "User created" });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
exports.postRetrieveCustomer = async (req, res, next) => {
  let loadedUser;
  try {
    const { email, password } = req.body;
    // const loadedUser = await User.findOne({ email: req.body.email });

    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401; //401:
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401; //401:
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      config.jwt_secret,
      { expiresIn: config.jwt_expires_in }
    );

    const customer = await stripe.customers.retrieve(loadedUser.customerId);
    if (!customer) {
      const error = new Error("No customer found");
      error.statusCode = 400;
      throw error;
    }

    // Set a cookie and send the response
    res.status(201).json({
      customer: customer,
      message: "User logged in successfully",
      token: token,
    });
    // }
  } catch (err) {
    // Handle errors
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    console.log(err);
    // Pass the error to the Express error handling middleware
    next(err);
  }
};

exports.postSubscription = async (req, res, next) => {
  try {
    const customerId = req.cookies["customer"] || req.body.customerId;
    const priceId = req.body.priceId;

    console.log(customerId, priceId);

    if (!customerId) {
      const error = new Error("No customer found");
      error.statusCode = 400;
      throw error;
    }

    const loadedUser = await User.findOne({ customerId: customerId });

    if (loadedUser.subscriptionStatus === "active") {
      const error = new Error("You already have an active subscription");
      error.statusCode = 400;
      throw error;
    }

    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
      });

      const updateUser = await User.findOne({ customerId: customerId });
      updateUser.subscriptionId = subscription.id;
      updateUser.subscriptionStatus = subscription.status;

      await updateUser.save();

      res.send({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    } catch (error) {
      return res.status(400).send({ error: { message: error.message } });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSubscriptionDetails = async (req, res, next) => {
  // Simulate authenticated user. In practice this will be the
  // Stripe Customer ID related to the authenticated user.
  const customerId = req.cookies["customer"];
  console.log(customerId);
  try {
    if (!customerId) {
      return res.status(400).send({ error: { message: "No customer found" } });
    }
    const customer = await stripe.customers.retrieve(customerId, {
      expand: ["subscriptions"],
    });

    const subscriptions = customer.subscriptions.data;
    const latestSubscription = subscriptions[subscriptions.length - 1];
    console.log(latestSubscription);
    res.status(200).send({ latestSubscription });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postCancelSubscription = async (req, res, next) => {
  const subscriptionId = req.body.subscriptionId;
  console.log(subscriptionId);

  try {
    const canceledSubscription = await stripe.subscriptions.cancel(
      subscriptionId
    );
    console.warn("testing purpose");
    console.log(canceledSubscription, "canceledSubscription");
    res.status(200).send({ canceledSubscription });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.postRequestPasswordReset = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("No user found");
      error.statusCode = 400;
      throw error;
    }
    //! set the verifyToken for 5 minutes
    const resetToken = await crypto.randomBytes(32).toString("hex").slice(0, 6);
    const resetTokenExpiration = Date.now() + 300000;
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    console.log(user.verifyTokenExpiration);
    await user.save();
    await subscription("verify", { email, verifyToken: resetToken });
    console.log(email, { verifyToken: resetToken });
    res.status(201).json({ message: "Verify code sent successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.postVerifyResetToken = async (req, res, next) => {
  const resetToken = req.params.resetToken;
  const { email } = req.body;
  try {
    if (!resetToken) {
      const error = new Error("No code found");
      error.statusCode = 400;
      throw error;
    }
    if (!email) {
      const error = new Error("No email found");
      error.statusCode = 400;
      throw error;
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("No user found");
      error.statusCode = 400;
      throw error;
    }
    if (user.resetToken !== resetToken) {
      const error = new Error("Invalid code");
      error.statusCode = 400;
      throw error;
    }
    if (user.resetTokenExpiration < Date.now()) {
      const error = new Error("Code expired");
      error.statusCode = 400;
      throw error;
    }
    // user.verifyTokenExpiration = undefined;
    user.resetToken = undefined;
    await user.save();
    const token = jwt.sign(
      {
        email: user.email,
        resetTokenExpiration: user.resetTokenExpiration,
      },
      config.jwt_secret,
      { expiresIn: config.jwt_expires_in_verify }
    );

    res.status(201).json({ message: "Verify successfully", token: token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postPasswordReset = async (req, res, next) => {
  const { password, token } = req.body;
  try {
    if (!password) {
      const error = new Error("No password found");
      error.statusCode = 400;
      throw error;
    }
    if (!token) {
      const error = new Error("No token found");
      error.statusCode = 400;
      throw error;
    }
    const decodedToken = jwt.verify(token, config.jwt_secret);
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      const error = new Error("No user found");
      error.statusCode = 400;
      throw error;
    }
    if (decodedToken.resetTokenExpiration < Date.now()) {
      const error = new Error("Time expired");
      error.statusCode = 400;
      throw error;
    }
    const hashedPw = await bcrypt.hash(password, 12);
    user.password = hashedPw;
    user.resetTokenExpiration = undefined;
    await user.save();
    await subscription("passwordChanged", { email: user.email });
    res.status(201).json({ message: "Password reset successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
