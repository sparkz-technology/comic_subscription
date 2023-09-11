const amqp = require("amqplib"); // amqp full form is Advanced Message Queuing Protocol

async function mailServices(queue, data) {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false }); //durable: false, the queue will be deleted once the connection is closed.
    if (queue === "weeklyComic") {
      channel.sendToQueue(queue, data);
      console.log(`Message sent to ${queue}`);
      console.log("rabbitmq is working fine", data);
      return setTimeout(() => {
        connection.close();
        console.log("connection closed");
      }, 500);
    }
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    console.log(`Message sent to ${queue}`);
    console.log(data);
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.log(error);
  }
}

// mailServices("weeklyComic", "hello");
// mailServices("subscription", "hello");
// mailServices("cancelSubscription", "hello");
// mailServices("trialSubscription", "hello");
// mailServices("verify", "hello");
// mailServices("passwordChanged", "hello");

module.exports = mailServices;
