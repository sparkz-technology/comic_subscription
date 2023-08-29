require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/config");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //split the token and get the second part
    const decodedToken = await jwt.verify(token, config.jwt_secret);
    req.userId = decodedToken.userId; //add new field to the request
    const user = await User.findOne({ _id: req.userId });
    console.log(user);
    if (!user) throw error;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "You are not authenticated!", error: error });
  }
};
