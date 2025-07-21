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
exports.add = async (product) => {
    const { name, price, category_id } = product
    const [result] = await db.execute('CALL AddProduct(?, ?, ?)', [name, price, category_id])
    return {
        success: true,
        message: 'Product added successfully',
        result
    }
}

// Update stock for a product (calls UpdateStock)
exports.updateStock = async (productId, quantity) => {
    const [result] = await db.execute('CALL UpdateStock(?, ?)', [productId, quantity])
    return {
        success: true,
        message: 'Stock updated successfully',
        result
    }
}
