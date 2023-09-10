const express = require("express");
const router = express.Router();
const upload = require("../utils/fileUpload");
const adminController = require("../controllers/admin");
const isAdmin = require("../middlewares/is-Admin");
const isAuth = require("../middlewares/is-Auth");

// Middleware for parsing form data

// Route for handling file uploads by admins
router.post(
  "/upload",
  isAuth, // Check if the user is authenticated
  isAdmin, // Check if the user is an admin
  upload.single("pdf"), // Handle file upload for the "pdf" field
  adminController.postUpload // Handle the file upload in the admin controller
);

module.exports = router;
