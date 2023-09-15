const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const userId = req.userId;
    console.log(userId, "in is-admin");

    // Check if the user has ADMIN role and is the same user
    const adminUser = await User.findOne({ role: "ADMIN", _id: userId });

    if (!adminUser) {
      const error = new Error("No Admin User Found");
      error.statusCode = 403; // Use 403 for "Not Authorized" error
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
