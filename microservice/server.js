const mongoose = require("mongoose");
const config = require("./config/config");

const connectToQueue = require("./app");

async function dbConnect() {
  try {
    await mongoose.connect(config.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB in Microservice!`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
}
async function serverStart() {
  try {
    await dbConnect();
    const queueNames = [
      "cancelSubscription",
      "subscription",
      "trialSubscription",
      "verify",
      "passwordChanged",
      "weeklyComic",
    ];
    await Promise.all(queueNames.map(connectToQueue));
    console.log("Connected to all queues!");
  } catch (error) {
    console.log(error);
  }
}

serverStart();
