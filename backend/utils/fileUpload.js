const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, "comic.pdf");
  },
});

const fileSizes = 1024 * 1024 * 10; // 10MB
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF files are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: fileSizes },
  fileFilter: fileFilter,
});

module.exports = upload;
