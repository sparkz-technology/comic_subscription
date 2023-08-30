const TrialUser = require("../models/trialUser");

async function trialSubscriber(consume) {
  console.log("Inside trialSubscriber", consume);
  const { email } = consume;
  const user = new TrialUser({ email });
  try {
    await user.save();
    console.log(`Added ${email} to database`);
  } catch (error) {
    console.log(error);
  }
}

async function deleteTrialSubscribers() {
  try {
    await TrialUser.deleteMany({});
    console.log("Deleted all subscribers");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  trialSubscriber,
  deleteTrialSubscribers,
};
