require("dotenv").config();
module.exports = {
  mongo_url: process.env.MONGO_URI,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  test: "test",
};
