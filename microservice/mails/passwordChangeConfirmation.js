// sendVerifyMail.js

const fs = require("fs");
const path = require("path");
const createTransporter = require("../utils/createTransport");
const config = require("../config/config");
const logoUrl = path.join(__dirname, "../templates/logo.png");

// Function to send a verification email
async function passwordChangeConfirmation(consume) {
  const { email } = consume;
  try {
    console.log(email);

    // Read the email template
    const templatePath = path.join(
      __dirname,
      "../templates/passwordChangeConfirmation.html"
    );
    const template = fs.readFileSync(templatePath, "utf-8");

    // Personalize the template
    const personalizedTemplate = template.replace(
      "[Subscriber's Name]",
      email.split("@")[0]
    );

    // Define email options
    const mailOptions = {
      from: config.email,
      to: email,
      subject: "Comic World Verification",
      html: personalizedTemplate,
      attachments: [
        {
          filename: "logo.png",
          path: logoUrl,
          cid: "logoImage",
        },
      ],
    };

    // Send the email using the transporter
    const info = await createTransporter.sendMail(mailOptions);

    // Return a success message
    return `Email sent to ${email}: ${info.response}`;
  } catch (error) {
    // Handle any errors that occur during the process
    return `Error sending email to ${email}: ${error}`;
  }
}
module.exports = passwordChangeConfirmation;
