/* eslint-disable import/order */
const config = require("../config/config");
const stripe = require("stripe")(config.stripe_secret_key);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const crypto = require("crypto");

const mailServices = require("../microservices/mailServices");
const User = require("../models/user");

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
    const user = await User.findOne({ email: email });
    // find if a user exists  and has an accountType of google
    console.log(user, "user");

    const hashedPw = await bcrypt.hash(password, 12);
    const customer = await stripe.customers.create({ email: email });
    const newUser = new User({
      email: email,
      password: hashedPw,
      customerId: customer.id,
    });
    await newUser.save();
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
    if (user && user.accountType === "google") {
      const error = new Error("Please login with google"); //
      error.statusCode = 401;
      throw error;
    }
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
        passwordResetCount: loadedUser.passwordResetCount,
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
      role: loadedUser.role,
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

exports.postRequestPasswordReset = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) throw new Error("No email found");

    const user = await User.findOne({ email: email });
    const accountType = user.accountType;
    if (accountType === "google") {
      const error = new Error("Please login with google"); //
      error.statusCode = 401;
      throw error;
    }
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
    await mailServices("verify", { email, verifyToken: resetToken });
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
    user.passwordResetCount = user.passwordResetCount + 1;
    await user.save();
    await mailServices("passwordChanged", { email: user.email });
    res.status(201).json({ message: "Password reset successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
