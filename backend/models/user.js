const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
    googleId: { type: String },
    customerId: { type: String },
    subscriptionId: { type: String },
    subscriptionStatus: { type: String },
    Current_period_end: { type: String },
    last4: { type: String },
    resetToken: String,
    resetTokenExpiration: { type: Number },
    passwordResetCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
