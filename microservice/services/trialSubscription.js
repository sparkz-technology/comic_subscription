const schedule = require("node-schedule");
const trial = require("../mails/trial");
const deleteTrialSubscribers = require("../controllers/trialUser");

function scheduleTrialEmail() {
  schedule.scheduleJob("0 0 0 * * *", async () => {
    try {
      const result = await trial();

      switch (result) {
        case "No trial users found!":
          console.log("No trial users found!");
          break;
        case false:
          console.error("Error sending trial mail!");
          break;
        case true:
          await deleteTrialSubscribers();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error scheduling trial email:", error);
    }
  });
}

module.exports = scheduleTrialEmail;
