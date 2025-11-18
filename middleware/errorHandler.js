const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[${new Date().toISOString()}] ERROR: ${err.name} - ${message}`);

  res.status(statusCode).json({
    error: message
  });
};

module.exports = errorHandler;
