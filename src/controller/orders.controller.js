const ApiError = require('../errors/apiError');
const {
  getById,
  getAll,
  add,
  update,
  delete: deleteOrderRepo
} = require('../repository/orders.repository');

// Get order by ID
const getOrderById = async (id) => {
  const order = await getById(id);
  if (!order) {
    throw ApiError.notFound('Order not found');
  }
  return order;
};

// Get all orders
const getAllOrders = async () => {
  return await getAll();
};

// Create order
const createOrder = async (order) => {
  if (
    !order.order_id ||
    !order.payment_method ||
    !order.amount ||
    !order.reference_number
  ) {
    throw ApiError.badRequest('Missing required fields: order_id, payment_method, amount, or reference_number');
  }
  return await add(order);
};

// Update order
const updateOrder = async (id, orderData) => {
  if (!orderData.amount || !orderData.order_method) {
    throw ApiError.badRequest('Missing required fields: amount or order_method');
  }
  const updated = await update(id, orderData);
  if (!updated) {
    throw ApiError.notFound('Order not found to update');
  }
  return updated;
};

// Delete order
const deleteOrder = async (id) => {
  const deleted = await deleteOrderRepo(id);
  if (!deleted) {
    throw ApiError.notFound('Order not found to delete');
  }
  return deleted;
};

module.exports = {
  getOrderById,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
