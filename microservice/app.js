const ampq = require("amqplib");
const mongoose = require("mongoose");
const schedule = require("node-schedule");

const { subscriber } = require("./controllers/user");
const { deleteSubscriber } = require("./controllers/user");
const config = require("./config/config");
const {
  sendMail,
  sendConfirmationMail,
  sendCancelMail,
  sendTrialMail,
} = require("./services/mail");

const {
  trialSubscriber,
  deleteTrialSubscribers,
} = require("./controllers/trialUser");

mongoose.connect(config.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function connectQuery() {
  try {
    await connect("cancelSubscription");
    await connect("subscription");
    await connect("trialSubscription");
    console.log(`Connected to RabbitMQ in Microservice!`);
  } catch (err) {
    console.error("Error connecting to RabbitMQ in Microservice!");
  }
}
connectQuery();
async function connect(queue) {
  try {
    const connection = await ampq.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.purgeQueue(queue);
    await channel.assertQueue(queue, { durable: false });
    channel.consume(queue, async (message) => {
      const consume = JSON.parse(message.content.toString());
      console.log(`Received message: ${message.content.toString()}`);
      console.log(`Received message: ${consume}`);
      if (queue === "subscription") {
        await subscriber(consume);
        await sendConfirmationMail(consume);
      } else if (queue === "cancelSubscription") {
        console.log(`Received message: ${consume} from ${queue}`);
        await cancelSubscription(consume);
      } else if (queue === "trialSubscription") {
        console.log(`Received message: ${consume} from ${queue}`);
        console.log(consume.email);
        await trialSubscriber(consume);
      }
      channel.ack(message);
    });
  } catch (error) {
    console.log(error);
  }
}

// Schedule for the end of the week (Sunday)
schedule.scheduleJob("59 23 * * 0", async () => {
  // schedule.scheduleJob("*/40 * * * * *", async () => {
  await sendMail();
  console.log("End of the week (Sunday) task executed!");
});

async function cancelSubscription(consume) {
  try {
    const { email } = consume;
    console.log(`Email: ${email}`);
    await deleteSubscriber(email);
    await sendCancelMail(consume);
  } catch (error) {
    console.log(error);
  }
}
//Schedule for trial Subscription in the end of the day
schedule.scheduleJob("0 0 0 * * *", async () => {
  // schedule.scheduleJob("*/40 * * * * *", async () => {
  await sendTrialMail();

  await deleteTrialSubscribers();
});
//Schedule for trial Subscription in the end of the day
schedule.scheduleJob("0 0 0 * * *", async () => {
  // schedule.scheduleJob("*/40 * * * * *", async () => {
  await sendTrialMail();

  await deleteTrialSubscribers();
});
