const { trial } = require("../microservices/trial");
const { validationResult } = require("express-validator");
const TrialUser = require("../models/trialUser");

exports.postUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { email } = req.body;
    const trialuser = new TrialUser({
      email,
      subscription: "trial",
    });
    await trialuser.save();
    res.status(201).json({ message: "Free trial subscribed.." });
    console.log(trialuser);
    trial(trialuser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
