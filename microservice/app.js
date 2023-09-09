const amqp = require("amqplib");

const passwordChangeConfirmation = require("./mails/passwordChangeConfirmation");
const verifyCode = require("./mails/verifyCode");
const subscriptionCancel = require("./mails/subscriptionCancel");
const subscriptionConfirmation = require("./mails/subscriptionConfirmation");

const { trialSubscriber } = require("./controllers/trialUser");
const { subscriber, deleteSubscriber } = require("./controllers/user");

const scheduleWeeklyComicJob = require("./services/activeSubscription");
const scheduleTrialEmail = require("./services/trialSubscription");

async function connectToQueue(queue) {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.purgeQueue(queue);
    await channel.assertQueue(queue, { durable: false });

    channel.consume(queue, async (message) => {
      try {
        const consume = JSON.parse(message.content.toString());
        // console.log(`Received message: ${message.content.toString()}`);

        if (queue === "subscription") {
          await Promise.all([
            subscriber(consume),
            subscriptionConfirmation(consume),
          ]);
        } else if (queue === "cancelSubscription") {
          console.log(`Received message from ${queue}`);
          await Promise.all([
            deleteSubscriber(consume.email),
            subscriptionCancel(consume),
          ]);
        } else if (queue === "trialSubscription") {
          console.log(`Received message from ${queue}`);
          await trialSubscriber(consume);
        } else if (queue === "verify") {
          console.log(`Received message from ${queue}`);
          await verifyCode(consume);
        } else if (queue === "passwordChanged") {
          console.log(`Received message from ${queue}`);
          await passwordChangeConfirmation(consume);
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
scheduleWeeklyComicJob();
scheduleTrialEmail();

module.exports = connectToQueue;
