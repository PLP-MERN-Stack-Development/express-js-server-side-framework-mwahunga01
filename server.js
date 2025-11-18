// server.js - Week 2 Express.js Assignment
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser'); // kept for compatibility with starter

// Import your organized code
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (keep bodyParser for starter compatibility + add yours)
app.use(bodyParser.json());
app.use(express.json()); // also add built-in for robustness
app.use(logger);

// Root route (slightly improved from starter)
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Mount all product routes under /api/products
app.use('/api/products', productsRouter);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// REQUIRED FOR AUTOGRADING — DO NOT DELETE THIS LINE
module.exports = app;
