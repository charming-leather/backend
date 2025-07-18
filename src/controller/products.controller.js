const db = require('../config/db')
const {add} = require('../repository/product.repository');
const { updateStock } = require('../repository/product.repository');

// 1. Create a new product using AddProduct stored procedure
exports.createProduct = async (name, price, categoryId) => {
const result = await add(name, price, categoryId);
return result;
};


// 2. Update product stock using UpdateStock stored procedure
exports.updateStock = async (productId, quantity) => {
  const result = await updateStock(productId, quantity);
  return result;
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

