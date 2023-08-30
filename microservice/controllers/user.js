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

async function deleteSubscriber(email) {
  try {
    if (!email) {
      console.log("No email provided");
      return;
    }
    await User.deleteOne({ email });
    console.log(`Deleted ${email} from database`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  subscriber,
  deleteSubscriber,
};
