const amqp = require("amqplib");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const config = require("./config/config");
const sendPasswordChangedMail = require("./services/sendPasswordChangeMail");
const {
  sendMail,
  sendConfirmationMail,
  sendCancelMail,
  sendTrialMail,
  sendVerifyMail,
} = require("./services/mail");

const { subscriber, deleteSubscriber } = require("./controllers/user");
const {
  trialSubscriber,
  deleteTrialSubscribers,
} = require("./controllers/trialUser");

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

async function connectToQueue(queue) {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.purgeQueue(queue);
    await channel.assertQueue(queue, { durable: false });
    console.log(`Connected to RabbitMQ queue: ${queue}`);

    channel.consume(queue, async (message) => {
      try {
        const consume = JSON.parse(message.content.toString());
        // console.log(`Received message: ${message.content.toString()}`);

        if (queue === "subscription") {
          await Promise.all([
            subscriber(consume),
            sendConfirmationMail(consume),
          ]);
        } else if (queue === "cancelSubscription") {
          console.log(`Received message from ${queue}`);
          await cancelSubscription(consume);
        } else if (queue === "trialSubscription") {
          console.log(`Received message from ${queue}`);
          await trialSubscriber(consume);
        } else if (queue === "verify") {
          console.log(`Received message from ${queue}`);
          await sendVerifyMail(consume);
        } else if (queue === "passwordChanged") {
          console.log(`Received message from ${queue}`);
          await sendPasswordChangedMail(consume);
        }

        channel.ack(message);
      } catch (error) {
        console.error("Error processing message:", error);
        channel.reject(message, false); // Reject and requeue the message on error
      }
    });
  } catch (error) {
    console.error("RabbitMQ Connection Error:", error.message);
    process.exit(1);
  }
}

async function cancelSubscription(consume) {
  try {
    const { email } = consume;
    console.log(`Cancelling subscription for email: ${email}`);
    await deleteSubscriber(email);
    await sendCancelMail(consume);
  } catch (error) {
    console.error("Error cancelling subscription:", error);
  }
}

// Schedule for the end of the week (Sunday)
schedule.scheduleJob("59 23 * * 0", async () => {
  try {
    await sendMail();
    console.log("End of the week (Sunday) task executed!");
  } catch (error) {
    console.error("Error sending weekly email:", error);
  }
});

// Schedule for trial Subscription at the end of the day
schedule.scheduleJob("0 0 0 * * *", async () => {
  try {
    const result = await sendTrialMail();

    switch (result) {
      case "No trial users found!":
        console.log("No trial users found!");
        break;
      case false:
        console.error("Error sending trial mail!");
        break;
      case true:
        await deleteTrialSubscribers();
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("Error scheduling trial email:", error);
  }
});

async function main() {
  await dbConnect();
  await connectToQueue("cancelSubscription");
  await connectToQueue("subscription");
  await connectToQueue("trialSubscription");
  await connectToQueue("verify");
  await connectToQueue("passwordChanged");
}

main();
