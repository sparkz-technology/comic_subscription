const fs = require("fs");
const path = require("path");
const config = require("../config/config");
const createTransporter = require("../utils/createTransport");
const logoUrl = path.join(__dirname, "../templates/logo.png");

async function verifyCode(consume) {
  try {
    const { email, verifyToken } = consume;
    const templatePath = path.join(__dirname, "../templates/verifyCode.html");
    const template = fs.readFileSync(templatePath, "utf-8");
    const personalizedTemplate = template
      .replace("[Subscriber's Name]", email.split("@")[0])
      .replace("[Verification_Code]", verifyToken);
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
module.exports = verifyCode;
