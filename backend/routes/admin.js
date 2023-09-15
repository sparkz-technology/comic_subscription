const express = require("express");
const router = express.Router();
const upload = require("../utils/fileUpload");
const adminController = require("../controllers/admin");
const isAdmin = require("../middlewares/is-Admin");
const isAuth = require("../middlewares/is-Auth");

router.post(
  "/upload",
  isAuth,
  isAdmin,
  upload.single("pdf"),
  adminController.postUpload
);
// isAuth, add this middleware to protect the route after testing
router.post("/download", isAuth, isAdmin, adminController.getDownload);

router.post("/details", isAuth, isAdmin, adminController.getComicDetails);

router.post("/delete", isAuth, isAdmin, adminController.deleteComic);

router.post(
  "/user/week",
  isAuth,
  isAdmin,
  adminController.getComicUserForLineChartWeek
);

router.post(
  "/user/month",
  isAuth,
  isAdmin,
  adminController.getComicUserForLineChartMonth
);

router.post(
  "/user/last6months",
  isAuth,
  isAdmin,
  adminController.getComicUserForLineChartLast6Months
);

router.post("/user/data", isAuth, adminController.getData);

module.exports = router;
