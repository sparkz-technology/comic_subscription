const User = require("../models/user");

async function subscriber(consume) {
  const { email, customerId, subscriptionId, Current_period_end } = consume;
  // find the user in the database
  const findUser = await User.findOne({ email });
  if (findUser) {
    console.log("User already exists");
    return;
  }
  try {
    const user = new User({
      email,
      customerId,
      subscriptionId,
      Current_period_end,
    });
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
