const amqp = require("amqplib");

async function trial(user) {
  try {
    const connection = await amqp.connect("amqp://127.0.0.1:5672");
    const channel = await connection.createChannel();
    const queue = "trial";
    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(user)));
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { trial };
