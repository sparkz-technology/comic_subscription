const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const userId = req.body.userId || "64fd647b354bdcbb63ba0ead";
    console.log(userId);
    const adminUser = await User.findOne({ role: "admin", _id: userId });
    if (!adminUser) {
      const error = new Error("No Admin User Found");
      error.statusCode = 422;
      throw error;
    }
    if (adminUser.role !== "admin") {
      const error = new Error("Not Authorized");
      error.statusCode = 422;
      throw error;
    }
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
