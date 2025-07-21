const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjust path if needed
const productController = require('../controller/products.controller');

// 1. Add a New Product
router.post('/products/create', async (req, res) => {
  const { name, price, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const result = await productController.createProduct(name, price, categoryId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to add product" });
  }
});

// 2. Update Stock for a Product
router.patch('/products/:productId/stock', async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || isNaN(quantity)) {
    return res.status(400).json({ error: "Invalid or missing quantity" });
  }

  try {
    const result = await productController.updateStock(productId, quantity);
    res.status(200).json(result); // result should be { success, message, data }
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to update stock" });
  }
});

// 3. Get Products by Category ID
router.get('/products/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    const result = await productController.getByCategory(categoryId);
    res.status(200).json(result); // result should be { success, data }
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch products by category' });
  }
});

module.exports = router;
