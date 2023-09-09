const amqp = require("amqplib"); // amqp full form is Advanced Message Queuing Protocol
async function mailServices(queue, user) {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false }); //durable: false, the queue will be deleted once the connection is closed.
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(user)));
    console.log(`Message sent to ${queue}`);
    console.log(user);
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.log(error);
  }
}
// subscription("cancelSubscription");
// subscription("subscription");
// subscription("trialSubscription");
// subscription("verify");
// subscription("passwordChanged");
module.exports = mailServices;
