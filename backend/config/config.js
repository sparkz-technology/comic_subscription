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
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_redirect_uri: process.env.GOOGLE_REDIRECT_URI, //not in use
  google_refresh_token: process.env.GOOGLE_REFRESH_TOKEN, //not in use
  google_access_token: process.env.GOOGLE_ACCESS_TOKEN, //not in use
  session_secret: process.env.SESSION_SECRET,
};
