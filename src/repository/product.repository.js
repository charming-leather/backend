const db = require('../config/db')


// Get product by ID (if needed)
exports.getById = async (productId) => {
    const [result] = await db.query('SELECT * FROM products WHERE ProductID = ?', [productId])
    return result[0]
}

// Get all products in a category (calls GetProductsByCategory)
exports.getByCategory = async (categoryId) => {
    const [result] = await db.execute('CALL GetProductsByCategory(?)', [categoryId])
    return result[0] // First result set
}

// Add new product (calls AddProduct)
exports.add = async (name, price, categoryId) => {
    const result = await db.callProcedure ('AddProduct', [name, price, categoryId])
    if (result.affectedRows === 1) {
    return {
      success: true,
    };
  }
}

exports.updateStock = async (productId, quantity) => {
  const result = await db.callProcedure('UpdateStock', [productId, quantity]);
  return {
    success: true,
    message: '✅ Stock updated successfully',
    data: result[0] // assuming result[0] holds the returned dataset
  };
};

