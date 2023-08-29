const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    subscriptionId: {
      type: String,
    },
    subscriptionStatus: {
      type: String,
    },
    Current_period_end: {
      type: String,
    },
    last4: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
