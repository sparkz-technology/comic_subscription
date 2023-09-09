const path = require("path");
const fs = require("fs");
const User = require("../models/user");
const createTransporter = require("../utils/createTransport");
const config = require("../config/config");
const logoUrl = path.join(__dirname, "../templates/logo.png");
const templatePath = path.join(__dirname, "../templates/weeklyComic.html");
const attachmentPath = path.join(__dirname, "../templates/weeklyComic.pdf");
const readFile = fs.promises.readFile;
async function WeeklyComic() {
  try {
    // Read the email template
    const template = await readFile(templatePath, "utf-8");
    const users = await User.find({});
    const emailPromises = users.map(async (user) => {
      const personalizedTemplate = template.replace(
        "[Subscriber's Name]",
        user.email.split("@")[0]
      );

      const mailOptions = {
        from: config.email,
        to: user.email,
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
            path: attachmentPath,
          },
        ],
      };

      try {
        const info = await createTransporter.sendMail(mailOptions);
        return `Email sent to ${user.email}: ${info.response}`;
      } catch (error) {
        return `Error sending email to ${user.email}: ${error}`;
      }
    });

    const results = await Promise.all(emailPromises);
    results.forEach((result) => {
      console.log(result);
    });
  } catch (err) {
    console.log(err);
  }
}
module.exports = WeeklyComic;
