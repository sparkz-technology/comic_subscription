module.exports = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const { message } = error;
  const { data } = error;
  console.log(error, "error middleware");
  res.status(status).json({ message: message, data: data });
  console.log(message, "error middleware");
};
