const fs = require("fs");
const path = require("path");
const config = require("../config/config");
const readFile = fs.promises.readFile;
const createTransporter = require("../utils/createTransport");
const logoUrl = path.join(__dirname, "../templates/logo.png");
async function subscriptionCancel(consume) {
  const {
    email,
    customerId,
    subscriptionId,
    Current_period_end,
    subscriptionStatus,
  } = consume;
  try {
    const templatePath = path.join(
      __dirname,
      "../templates/subscriptionCancel.html"
    );

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
      const info = await createTransporter.sendMail(mailOptions);
      return `Email sent to ${email}: ${info.response}`;
    } catch (error) {
      return `Error sending email to ${email}: ${error}`;
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = subscriptionCancel;
