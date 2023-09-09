const fs = require("fs");
const path = require("path");
const TrialUser = require("../models/trialUser");

const config = require("../config/config");
const readFile = fs.promises.readFile;
const trailAttachmentPath = path.join(__dirname, "../templates/trialComic.pdf");
const logoUrl = path.join(__dirname, "../templates/logo.png");
const createTransporter = require("../utils/createTransport");
async function trial() {
  try {
    const templatePath = path.join(__dirname, "../templates/trial.html");
    const trialUsers = await TrialUser.find({});
    if (trialUsers.length === 0) {
      return "No trial users found!";
    }
    let isSuccess = true;
    const emailPromises = trialUsers.map(async (trialUser) => {
      // Read the email template
      const template = await readFile(templatePath, "utf-8");
      const personalizedTemplate = template.replace(
        "[Subscriber's Name]",
        trialUser.email.split("@")[0]
      );

      const mailOptions = {
        from: config.email,
        to: trialUser.email,
        subject: "Comic World ",
        html: personalizedTemplate,
        attachments: [
          {
            filename: "logo.png",
            path: logoUrl,
            cid: "logoImage",
          },
          {
            filename: "comic.pdf",
            path: trailAttachmentPath,
          },
        ],
      };

      try {
        const info = await createTransporter.sendMail(mailOptions);
        return `Email sent to ${trialUser.email}: ${info.response}`;
      } catch (error) {
        isSuccess = false;
        return `Error sending email to ${trialUser.email}: ${error}`;
      }
    });
    await Promise.all(emailPromises);
    return isSuccess;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = trial;
