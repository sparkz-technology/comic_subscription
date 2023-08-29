require("dotenv").config();
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URI,
  price_id: process.env.PRICE_ID,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
};
