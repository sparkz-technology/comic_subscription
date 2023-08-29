const nodemailer = require("nodemailer");
const fs = require("fs");
const util = require("util");
const path = require("path");
const User = require("../models/user");
const config = require("../config/config");
// Read the template file
const readFile = util.promisify(fs.readFile);
// path to the template
const attachmentPath = path.join(__dirname, "../templates/comic.pdf");
const logoUrl = path.join(__dirname, "../templates/logo.png");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.email,
    pass: config.password,
  },
});

async function sendMail() {
  const templatePath = path.join(__dirname, "../templates/mail.html");
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
        const info = await transporter.sendMail(mailOptions);
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
async function sendConfirmationMail(consume) {
  const { email, customerId, subscriptionId, Current_period_end } = consume;
  try {
    const templatePath = path.join(__dirname, "../templates/confirmation.html");

    // Read the email template
    const template = await readFile(templatePath, "utf-8");
    const personalizedTemplate = template
      .replace("[Subscriber's Name]", email.split("@")[0])
      .replace("[customerId]", customerId)
      .replace("[subscriptionId]", subscriptionId)
      .replace("[Current_period_end]", Current_period_end);

    const mailOptions = {
      from: config.email,
      to: email,
      subject: "Comic World ",
      html: personalizedTemplate,
      attachments: [
        {
          filename: "logo.png",
          path: logoUrl,
          cid: "logoImage",
        },
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return `Email sent to ${email}: ${info.response}`;
    } catch (error) {
      return `Error sending email to ${email}: ${error}`;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { sendMail, sendConfirmationMail };
