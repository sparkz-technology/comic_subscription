require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/config");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //split the token and get the second part
    const decodedToken = await jwt.verify(token, config.jwt_secret);
    req.userId = decodedToken.userId; //add new field to the request
    req.passwordResetCount = decodedToken.passwordResetCount;
    const user = await User.findOne({ _id: req.userId });
    console.log(user);
    if (!user) throw error;
    if (user.passwordResetCount !== req.passwordResetCount) {
      const error = new Error("Invalid token");
      error.statusCode = 401;
      throw error;
    }
    if (req.passwordResetCount === user.passwordResetCount - 1) {
      const error = new Error("password has been reset");
      error.statusCode = 401;
      throw error;
    }

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "You are not authenticated!", error: error });
  }
};
