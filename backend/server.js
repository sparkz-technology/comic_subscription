const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config/config");

async function connect() {
  try {
    await mongoose.connect(config.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const server = app.listen(config.port, () => {
      console.log("Server is running on http://localhost:" + config.port);
      console.log("MongoDB is running on", config.mongo_url);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connect();
