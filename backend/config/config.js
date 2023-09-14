require("dotenv").config();
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URI,
  price_id: process.env.PRICE_ID,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  origin: process.env.ORIGIN,
  stripe_webhook_orgin: process.env.STRIPE_WEBHOOK_ORIGIN,
  jwt_expires_in_verify: process.env.JWT_EXPIRES_IN_VERIFY,
  end_point_secret: process.env.END_POINT_SECRET,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
};
