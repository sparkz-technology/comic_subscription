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
    //comvert to ISO  to 12 hour format
    user.updatedAt = new Date();
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

exports.getDownload = async (req, res, next) => {
  const userId = req.userId || "64fd6488354bdcbb63ba0eb0";

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const filePath = path.join(__dirname, "..", user.filePath);

    const fileStream = fs.createReadStream(filePath);

    fileStream.on("open", () => {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=comic.pdf");
      fileStream.pipe(res);
    });

    fileStream.on("error", (err) => {
      console.error("Error reading file:", err);
      if (err.code === "ENOENT") {
        return res.status(404).send("File not found");
      }
      next(err);
    });
  } catch (err) {
    console.error("Error in try-catch:", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getComicDetails = async (req, res, next) => {
  const userId = req.userId || "64fd6488354bdcbb63ba0eb0";
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    if (!user.filePath) {
      return res.status(200).json({
        message: "Comic not uploaded yet",
        status: "Not_Uploaded",
      });
    }

    res.status(200).json({
      message: "Comic fetched successfully",
      status: "Uploaded",
      updatedAt: user.updatedAt.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        dateStyle: "full",
        timeStyle: "medium",
      }),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteComic = async (req, res, next) => {
  const userId = req.userId || "64fd6488354bdcbb63ba0eb0";

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // Define the actual path to the file you want to delete
    const pdfFilePath = path.join(__dirname, "../", user.filePath);

    fs.unlink(pdfFilePath, (err) => {
      if (err) {
        // Handle the error
        console.error("Error deleting file:", err);
        return res.status(500).json({
          message: "File deletion failed",
        });
      }

      // File was deleted successfully, update the user's filePath
      user.filePath = "";
      user.save(); // Assuming you're using a Mongoose model

      res.status(200).json({
        message: "File deleted successfully",
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
