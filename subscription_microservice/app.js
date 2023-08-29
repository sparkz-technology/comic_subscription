const ampq = require("amqplib");
const mongoose = require("mongoose");
const schedule = require("node-schedule");

const { subscriber } = require("./controllers/user");
const { deleteSubscribers } = require("./controllers/user");
const config = require("./config/config");
// const sendEmail = require("./services/mail");
// const sendConfirmationMail = require("./services/mail");
const { sendMail, sendConfirmationMail } = require("./services/mail");

mongoose.connect(config.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect();
async function connect() {
  try {
    const connection = await ampq.connect("amqp://127.0.0.1:5672");
    const channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
    const queue = "subscription";
    await channel.purgeQueue(queue);
    await channel.assertQueue(queue, { durable: false });
    channel.consume(queue, async (message) => {
      console.log(`Received message: ${message.content.toString()}`);
      const consume = JSON.parse(message.content.toString());
      console.log(`Received message: ${consume}`);
      await subscriber(consume);
      await sendConfirmationMail(consume);
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
// Schedule for the last day of the month
schedule.scheduleJob("59 23 28-31 * *", async () => {
  console.log("Last day of the month task executed!");
  await deleteSubscribers();
});
