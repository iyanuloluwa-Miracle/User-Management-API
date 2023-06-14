const createError = require('http-errors');

// Middleware to generate 404 error for undefined routes
const notFoundHandler = (req, res, next) => {
  next(createError.NotFound());
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

module.exports = { notFoundHandler, errorHandler };
  