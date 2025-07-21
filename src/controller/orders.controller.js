const Error = require("../errors/apiError");
const database = require("../repository/orders.repository");
const ApiError = require('../errors/apiError');


exports.getOrdersById = async (id) => {
  const order = await database.getById(id);
  if (!order || order.length === 0) {
    throw Error.notFound("Order not found");
  }
  return order;
};

exports.getAllOrders = async () => {
  return await database.getAll();
};

exports.createOrder = async (order) => {
  if (
    !order.order_id ||
    !order.payment_method ||
    !order.amount ||
    !order.reference_number
  ) {
    throw Error.badRequest(
      "Missing required fields: order_id, payment_method, amount, or reference_number"
    );
  }

  try {
    return await database.add(order);
  } catch (err) {
    console.error("Database error in createOrder:", err);
    throw Error.internal("Something went wrong while creating the order");
  }
};

exports.updateOrder = async (id, paymentData) => {
  if (!orderData.amount || !orderData.order_method) {
    throw Error.badRequest("Missing required fields: amount or order_method");
  }

  try {
    const updated = await database.update(id, orderData);
    if (!updated) {
      throw Error.notFound("Order not found to update");
    }
    return { message: "Order updated successfully" };
  } catch (err) {
    console.error("Database error in updateOrder:", err);  // <---- Add this line
    throw Error.internal("Could not update order");
  }
};


exports.deleteOrder = async (id) => {
  try {
    const deleted = await database.delete(id);
    if (!deleted) {
      throw Error.notFound("Order not found to delete");
    }
    return { message: "Order deleted successfully" };
  } catch (err) {
    console.error("Database error in deleteOrder:", err);
    throw ApiError.notFound(`Order with ID ${id} does not exist`);

  }
};
