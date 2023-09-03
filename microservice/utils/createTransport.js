// createTransport.js

const nodemailer = require("nodemailer");
const config = require("../config/config");

const createTransporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.email,
    pass: config.password,
  },
});

module.exports = createTransporter;
