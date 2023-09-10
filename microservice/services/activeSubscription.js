// scheduler.js
const axios = require("axios");
const schedule = require("node-schedule");
const WeeklyComic = require("../mails/WeeklyComic");

function scheduleWeeklyComicJob() {
  // Schedule the weekly email job to run every Sunday at 12:00 AM
  schedule.scheduleJob("59 23 * * 0", async () => {
    try {
      await WeeklyComic();
      console.log("End of the week (Sunday) task executed!");
    } catch (error) {
      console.error("Error sending weekly email:", error);
    }
  });
}

module.exports = scheduleWeeklyComicJob;
