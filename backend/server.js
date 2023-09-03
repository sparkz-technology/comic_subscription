const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config/config");

async function connect() {
  try {
    await mongoose.connect(config.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Add this option for avoiding deprecation warning
    });

    const server = app.listen(config.port, () => {
      console.log("http://localhost:" + config.port);
      console.log("MongoDB is running on port", config.mongo_url);
    });
    const io = require("./socket").init(server); // socket.io is initialized
    io.on("connection", () => {
      console.log("Client connected");
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connect();
