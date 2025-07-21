const db = require('../config/db');

exports.getById = async (id) => {
  const result = await db.callProcedure('GetOrderById', [id]);
  return result[0];
};

exports.getAll = async () => {
  const result = await db.callProcedure('GetAllOrders');
  return result[0];
};

exports.add = async (order) => {
  const result = await db.callProcedure('AddOrder', [
    order.customerId,
    order.method,
    order.amount,
  ]);

  const affected = result.affectedRows || result[0]?.affectedRows || result[1]?.affectedRows || 0;
  return affected === 1 ? { success: true } : null;
};

exports.update = async (id, order) => {
  const result = await db.callProcedure('UpdateOrder', [
    id,
    order.payment_method,
    order.amount,
  ]);

  const affected = result.affectedRows || result[0]?.affectedRows || result[1]?.affectedRows || 0;
  return affected === 1;
};

exports.delete = async (id) => {
  const result = await db.callProcedure('DeleteOrder', [id]);

  const affected = result.affectedRows || result[0]?.affectedRows || result[1]?.affectedRows || 0;
  return affected === 1;
};
