const amqp = require("amqplib");
async function subscription(queue, user) {
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

module.exports = { subscription };
