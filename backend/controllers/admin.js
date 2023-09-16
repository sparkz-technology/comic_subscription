const path = require("path");
const fs = require("fs"); // Require the 'fs.promises' module for async file operations
const moment = require("moment");

const User = require("../models/user");
const TrialUser = require("../models/trialUser");
const mailServices = require("../microservices/mailServices");

const pdfFilePath = path.join(__dirname, "../uploads/", "comic.pdf");

exports.postUpload = async (req, res, next) => {
  try {
    const userId = req.userId;
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
  const userId = req.userId;

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
  const userId = req.userId;
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
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const pdfFilePath = path.join(__dirname, "../", user.filePath);

    fs.unlink(pdfFilePath, (err) => {
      if (err) {
        // Handle the error
        console.error("Error deleting file:", err);
        return res.status(500).json({
          message: "File deletion failed",
        });
      }
      user.filePath = "";
      user.save(); // Assuming you're using a Mongoose model

      res.status(200).json({
        message: "File deleted successfully",
        status: "Not_Uploaded",
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getComicUserForLineChartWeek = async (req, res, next) => {
  try {
    const days = 7; // Parse the number of days from the query string
    let data = [];

    for (let i = days - 1; i >= 0; i--) {
      // Start from the most recent day and go back in time
      const startDate = moment().subtract(i, "days").startOf("day");
      const endDate = moment(startDate).endOf("day");

      const lastWeekUsers = await User.find({
        createdAt: { $gte: startDate, $lte: endDate },
      }).countDocuments();
      const lastWeekTrialUsers = await TrialUser.find({
        createdAt: { $gte: startDate, $lte: endDate },
      }).countDocuments();

      data.push({
        name: startDate.format("dddd"),
        user: lastWeekUsers,
        trialUser: lastWeekTrialUsers,
      });
    }

    res.status(200).json({
      message: "Trial Users fetched successfully",
      data: data, // Use the 'data' variable instead of 'trialUsers'
    });
  } catch (error) {
    console.error("Error in getComicUserForLineChart:", error);
    res.status(500).json({
      message: "An error occurred while fetching trial users",
      error: error.message,
    });
  }
};

exports.getComicUserForLineChartMonth = async (req, res, next) => {
  try {
    const weeks = 4; // 4 weeks in a month
    let data = [];

    for (let i = 0; i < weeks; i++) {
      const startDate = moment().startOf("month").add(i, "weeks");
      const endDate = moment(startDate).endOf("week");

      const weekUsers = await User.find({
        createdAt: { $gte: startDate, $lte: endDate },
      }).countDocuments();
      const weekTrialUsers = await TrialUser.find({
        createdAt: { $gte: startDate, $lte: endDate },
      }).countDocuments();

      data.push({
        name: `Week ${i + 1}`,
        user: weekUsers,
        trialUser: weekTrialUsers,
      });
    }

    res.status(200).json({
      message: "Trial Users fetched successfully for the month",
      data: data,
    });
  } catch (error) {
    console.error("Error in getComicUserForLineChartMonth:", error);
    res.status(500).json({
      message: "An error occurred while fetching trial users for the month",
      error: error.message,
    });
  }
};

exports.getComicUserForLineChartLast6Months = async (req, res, next) => {
  try {
    const months = 6; // Last 6 months
    let data = [];

    const currentDate = moment(); // Get the current date
    for (let i = months - 1; i >= 0; i--) {
      // Start from the current month and move back in time by months
      const startDate = moment(currentDate)
        .subtract(i, "months")
        .startOf("month");
      const endDate = moment(startDate).endOf("month");

      const monthUsers = await User.find({
        createdAt: { $gte: startDate, $lte: endDate },
      }).countDocuments();
      const monthTrialUsers = await TrialUser.find({
        createdAt: { $gte: startDate, $lte: endDate },
      }).countDocuments();

      data.push({
        name: startDate.format("MMMM"),
        user: monthUsers,
        trialUser: monthTrialUsers,
      });
    }

    res.status(200).json({
      message: "Trial Users fetched successfully for the last 6 months",
      data: data,
    });
  } catch (error) {
    console.error("Error in getComicUserForLineChartLast6Months:", error);
    res.status(500).json({
      message:
        "An error occurred while fetching trial users for the last 6 months",
      error: error.message,
    });
  }
};

exports.getData = async (req, res, next) => {
  try {
    const [users, trialUsers, activeUsers, cancelUsers] = await Promise.all([
      User.find().countDocuments(),
      TrialUser.find().countDocuments(),
      User.find({
        subscriptionStatus: "active",
      }).countDocuments(),
      User.find({
        subscriptionStatus: "cancelled",
      }).countDocuments(),
    ]);

    const justUsers = users - (activeUsers + cancelUsers + trialUsers);

    res.status(200).json({
      message: "Pie Chart Data fetched successfully",
      data: { users, trialUsers, activeUsers, cancelUsers, justUsers },
    });
  } catch (error) {
    console.error("Error in getDataForPieChart:", error);
    res.status(500).json({
      message: "An error occurred while fetching data for pie chart",
      error: error.message,
    });
  }
};
