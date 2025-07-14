const db = require('../config/db')

exports.createProduct = async (req, res) => {
  try {
    console.log("📦 Add product request body:", req.body);

    const { name, price, category_id } = req.body;

    const [result] = await db.execute('CALL AddProduct(?, ?, ?)', [
      name,
      price,
      category_id
    ]);

    res.status(201).json({
      message: "✅ Product added successfully",
      data: result[0]
    });

  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
};




// 2. Update product stock using UpdateStock stored procedure
exports.updateStock = async (req, res) => {
  const productId = req.params.id;
  const { quantity } = req.body;

  try {
    const [result] = await db.execute('CALL UpdateStock(?, ?)', [productId, quantity]);
    res.status(200).json({
      message: '✅ Stock updated successfully',
      data: result[0]
    });
  } catch (error) {
    console.error('❌ Error updating stock:', error);
    res.status(500).json({ error: 'Failed to update stock' });
  }
};


// 3. Get products by category using GetProductsByCategory stored procedure
exports.getByCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const [result] = await db.execute('CALL GetProductsByCategory(?)', [categoryId]);
    res.status(200).json({
      data: result[0]
    });
  } catch (error) {
    console.error('❌ Error fetching products by category:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

