const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('../utils/asyncHandler');
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');
const NotFoundError = require('../errors/NotFoundError');

let products = require('../data');

// GET /api/products – supports category filter, search, pagination
router.get('/', asyncHandler(async (req, res) => {
  let filtered = [...products];

  if (req.query.category) {
    filtered = filtered.filter(p => 
      p.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  if (req.query.search) {
    const term = req.query.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(term)
    );
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({
    page,
    limit,
    total: filtered.length,
    totalPages: Math.ceil(filtered.length / limit),
    data: filtered.slice(start, end)
  });
}));

// GET /api/products/statistics
router.get('/statistics', (req, res) => {
  const countByCategory = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  res.json({
    totalProducts: products.length,
    countByCategory
  });
});

// GET /api/products/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) throw new NotFoundError('Product not found');
  res.json(product);
}));

// POST /api/products
router.post('/', auth, validateProduct, asyncHandler(async (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
}));

// PUT /api/products/:id
router.put('/:id', auth, validateProduct, asyncHandler(async (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) throw new NotFoundError('Product not found');

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
}));

// DELETE /api/products/:id
router.delete('/:id', auth, asyncHandler(async (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) throw new NotFoundError('Product not found');

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted successfully', product: deleted[0] });
}));

module.exports = router;
