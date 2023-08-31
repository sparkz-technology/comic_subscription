const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const User = require("../models/user");
const TrialUser = require("../models/trialUser");

const config = require("../config/config");
// Read the template file
const readFile = fs.promises.readFile;
// path to the template
const attachmentPath = path.join(__dirname, "../templates/comic.pdf");
const trailAttachmentPath = path.join(__dirname, "../templates/trialComic.pdf");
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
async function sendCancelMail(consume) {
  const {
    email,
    customerId,
    subscriptionId,
    Current_period_end,
    subscriptionStatus,
  } = consume;
  try {
    const templatePath = path.join(__dirname, "../templates/cancel.html");

    // Read the email template
    const template = await readFile(templatePath, "utf-8");
    const personalizedTemplate = template
      .replace("[Subscriber's Name]", email.split("@")[0])
      .replace("[customerId]", customerId)
      .replace("[subscriptionId]", subscriptionId)

      .replace("[Current_period_end]", Current_period_end)
      .replace("[Cancellation_date]", new Date().toLocaleDateString())
      .replace("[subscriptionStatus]", subscriptionStatus);

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

async function sendTrialMail() {
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
        const info = await transporter.sendMail(mailOptions);
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

module.exports = {
  sendMail,
  sendConfirmationMail,
  sendCancelMail,
  sendTrialMail,
};
