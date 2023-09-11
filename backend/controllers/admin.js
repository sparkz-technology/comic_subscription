const path = require("path");
const fs = require("fs"); // Require the 'fs.promises' module for async file operations
const User = require("../models/user");
const mailServices = require("../microservices/mailServices");
const pdfFilePath = path.join(__dirname, "../uploads/", "comic.pdf");

exports.postUpload = async (req, res, next) => {
  try {
    const userId = req.userId || "64fd6488354bdcbb63ba0eb0";
    const file = req.file;

    if (!userId) {
      const error = new Error("No User");
      error.statusCode = 422;
      throw error;
    }

    if (!file) {
      const error = new Error("No File");
      error.statusCode = 422;
      throw error;
    }

    // Only split the last folder and file name
    const filePath = `/uploads/${path.basename(file.path)}`;

    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    user.filePath = filePath;
    await user.save();
    const pdfBuffer = fs.readFileSync(pdfFilePath);
    await mailServices("weeklyComic", pdfBuffer);

    res.status(200).json({
      message: "File Uploaded Successfully",
      file: file,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
