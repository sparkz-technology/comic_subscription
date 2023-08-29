const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const trialUserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const TrialUser = mongoose.model("TrialUser", trialUserSchema);
module.exports = TrialUser;
