const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config/config");

async function connect() {
  try {
    await mongoose.connect(config.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Add this option for avoiding deprecation warning
    });

    app.listen(config.port, () => {
      console.log("Server is running on port", config.port);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connect();
