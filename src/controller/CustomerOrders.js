const db = require('../db/db');

// Create
exports.addOrder = async (req, res) => {
  const { customer_id, product_id, quantity, order_date, status } = req.body;
  try {
    await db.query('CALL sp_addCustomerOrder(?, ?, ?, ?, ?)', [customer_id, product_id, quantity, order_date, status]);
    res.status(201).json({ message: 'Customer order created.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read One
exports.getOrderById = async (req, res) => {
  try {
    const [result] = await db.query('CALL sp_getCustomerOrderById(?)', [req.params.id]);
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read All
exports.getAllOrders = async (req, res) => {
  try {
    const [result] = await db.query('CALL sp_getAllCustomerOrders()');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateOrder = async (req, res) => {
  const id = req.params.id;
  const { customer_id, product_id, quantity, order_date, status } = req.body;
  try {
    await db.query('CALL sp_updateCustomerOrder(?, ?, ?, ?, ?, ?)', [id, customer_id, product_id, quantity, order_date, status]);
    res.status(200).json({ message: 'Customer order updated.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteOrder = async (req, res) => {
  try {
    await db.query('CALL sp_deleteCustomerOrder(?)', [req.params.id]);
    res.status(200).json({ message: 'Customer order deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};