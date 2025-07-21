const db = require('../config/db')

// Get all products in a category (calls GetProductsByCategory)
exports.getByCategory = async (categoryId) => {
  const result = await db.callProcedure('GetProductsByCategory', [categoryId]);
  if (result && result.length > 0) {
    return {
      success: true,
      data: result[0], // First result set
    };
  } else {
    return {
      success: false,
      data: [],
    };
  }
};

// Add new product (calls AddProduct)
exports.add = async (name, price, categoryId) => {
    const result = await db.callProcedure ('AddProduct', [name, price, categoryId])
    if (result.affectedRows === 1) {
    return {
      success: true,
    };
  }
}

// Update stock for a product (calls UpdateStock)
exports.updateStock = async (productId, quantity) => {
  const result = await db.callProcedure('UpdateStock', [productId, quantity]);
  return {
    success: true,
    message: '✅ Stock updated successfully',
    data: result[0] // assuming result[0] holds the returned dataset
  };
};

