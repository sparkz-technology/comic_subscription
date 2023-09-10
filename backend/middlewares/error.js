const config = require("../config/config");
module.exports = (error, req, res, next) => {
  const status = error.statusCode || 500;

  const { message, data } = error;
  if (config.env === "development") {
    res
      .status(status)
      .json({ message: message, data: data, stack: error.stack || "No Stack" });
    return;
  }
  res.status(status).json({ message: message, data: data });
};
