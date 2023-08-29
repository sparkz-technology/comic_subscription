const User = require("../models/user");

async function subscriber(consume) {
  const { email } = consume;
  const user = new User({ email });
  try {
    await user.save();
    console.log(`Added ${email} to database`);
  } catch (error) {
    console.log(error);
  }
}

async function deleteSubscribers() {
  try {
    await User.deleteMany({});
    console.log("Deleted all subscribers");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  subscriber,
  deleteSubscribers,
};
