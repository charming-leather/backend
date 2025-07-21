const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjust path if needed

// 1. Add a New Product
router.post('/products/create', async (req, res) => {
  const { name, price, CategoryID } = req.body;

  console.log("📥 Incoming product data:", req.body); // Debug

  if (!name || !price || !CategoryID) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const sql = `
      INSERT INTO products (name, price, CategoryID)
      VALUES (?, ?, ?)
    `;
    const params = [name, price, CategoryID];

    await db.query(sql, params); // Using .query because you're using mysql + promisify
    res.status(201).json({ message: "✅ Product added successfully" });
  } catch (error) {
    console.error("❌ Detailed DB error:", error);
    res.status(500).json({ error: error.message || "Failed to add product" });
  }
});




// 2. Update Stock for a Product
router.patch('/products/:productId/stock', async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || isNaN(quantity)) {
    return res.status(400).json({ error: 'Invalid or missing quantity' });
  }

  try {
    const result = await db.query('CALL UpdateStock(?, ?)', [productId, quantity]);
    console.log('UpdateStock result:', result);
    res.status(200).json({ message: '✅ Stock updated', data: result[0] });
  } catch (err) {
    console.error('❌ UpdateStock error:', err);
    res.status(500).json({ error: err.message || 'Failed to update stock' });
  }
});




// 3. Get Products by Category ID

router.get('/products/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    const result = await db.query('CALL GetProductsByCategory(?)', [categoryId]);
    console.log('📦 Products by category result:', result);

    // Return the first result set
    res.status(200).json({ data: result[0] });
  } catch (err) {
    console.error('❌ GetProductsByCategory error:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch products by category' });
  }
});


module.exports = router;
