const schedule = require("node-schedule");
const fs = require("fs");
const path = require("path");

const pdfFilePath = path.join(__dirname, "../uploads/", "comic.pdf");

function fileAutoDelete() {
  // Schedule the weekly email job to run every Sunday at 12:00 AM
  schedule.scheduleJob("59 23 * * 0", async () => {
    try {
      if (fs.existsSync(pdfFilePath)) {
        fs.unlinkSync(pdfFilePath);
      }
      console.log("End of the week (Sunday) task executed!");
    } catch (error) {
      console.error("Error sending weekly email:", error);
    }
  });
}

module.exports = fileAutoDelete;
