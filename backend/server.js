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
      console.log("http://localhost:" + config.port);
      console.log("MongoDB is running on port", config.mongo_url);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connect();
