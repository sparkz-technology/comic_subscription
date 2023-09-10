const User = require("../models/user");
exports.postUpload = async (req, res, next) => {
  try {
    const userId = req.userId || req.body.userId;
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
    const filePath = file.path;
    await User.updateOne({ _id: userId }, { filePath: filePath });

    res.status(201).json({
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
