const config = require("../config/config");
const User = require("../models/user");
const stripe = require("stripe")(config.stripe_secret_key);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

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
      { expiresIn: "24h" }
    );

    // if (!loadedUser) {
    //   // Create a new customer in Stripe
    //   const customer = await stripe.customers.create({ email: req.body.email });

    //   // Save the new user with the Stripe customer ID
    //   const user = new User({
    //     email: req.body.email,
    //     customerId: customer.id,
    //   });
    //   await user.save();

    //   // Set a cookie and send the response
    //   res.cookie("customer", customer.id, { maxAge: 900000, httpOnly: true });
    //   res.status(201).send({ customer: customer, message: "User created" });
    // } else {
    // Retrieve the customer using the stored customer ID
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

      // return res.status(400).send({ error: { message: "No customer found" } });
    }

    const loadedUser = await User.findOne({ customerId: customerId });

    if (loadedUser.subscriptionStatus === "active") {
      const error = new Error("You already have an active subscription");
      error.statusCode = 400;
      throw error;
      // return res.status(400).send({
      //   error: { message: "You already have an active subscription" },
      // });
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
    // const updateUser = await User.findOne({ subscriptionId: subscriptionId });
    // updateUser.subscriptionStatus = canceledSubscription.status;
    // await updateUser.save();
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

// exports.getSubscriptionDetails = async (req, res, next) => {
//   const customerId = req.cookies["customer"];
//   try {
//     const user = await User.findOne({ customerId: customerId });
//     if (!user) {
//       return res.status(400).send({ error: { message: "No user found" } });
//     }
//     res.status(200).send({ user });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };
