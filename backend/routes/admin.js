const express = require("express");
const router = express.Router();
const upload = require("../utils/fileUpload");
const adminController = require("../controllers/admin");
const isAdmin = require("../middlewares/is-Admin");
const isAuth = require("../middlewares/is-Auth");

router.post(
  "/upload",
  // isAuth, \
  isAdmin,
  upload.single("pdf"),
  adminController.postUpload
);
// isAuth, add this middleware to protect the route after testing
router.get("/download", adminController.getDownload);

router.get("/details", adminController.getComicDetails);

router.post("/delete", adminController.deleteComic);

module.exports = router;
