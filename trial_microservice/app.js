const ampq = require("amqplib");
const { subscriber } = require("./controllers/user");
const { deleteSubscribers } = require("./controllers/user");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const sendEmail = require("./services/mail");
const config = require("./config/config");
mongoose.connect(config.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect();
async function connect() {
  try {
    const connection = await ampq.connect("amqp://127.0.0.1:5672");
    const channel = await connection.createChannel();
    console.log("Connected to RabbitMQ in trial microservice");
    const queue = "trial";
    await channel.purgeQueue(queue);
    await channel.assertQueue(queue, { durable: false });
    channel.consume(queue, async (message) => {
      const consume = JSON.parse(message.content.toString());
      console.log(`Received message: ${consume.email}`);
      await subscriber(consume);
      channel.ack(message);
    });
  } catch (error) {
    console.log(error);
  }
}
// schedule.scheduleJob("*/40 * * * * *",  means every 40 seconds
// schedule.scheduleJob("0 0 0 * * *", means every day at midnight
// schedule.scheduleJob("*/40 * * * * *", async () => {
schedule.scheduleJob("0 0 0 * * *", async () => {
  await sendEmail();
  await deleteSubscribers();
});
