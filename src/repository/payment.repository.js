const db = require('../config/db');

exports.getById = async (id) => {
  const result = await db.callProcedure('GetPaymentById', [id]);
  return result[0];
};

exports.getAll = async () => {
  const result = await db.callProcedure('GetAllPayments');
  return result[0];
};

exports.add = async (payment) => {
  const result = await db.callProcedure('AddPayment', [
    payment.customerId,
    payment.method,
    payment.amount,
  ]);

  const affected = result.affectedRows || result[0]?.affectedRows || result[1]?.affectedRows || 0;
  return affected === 1 ? { success: true } : null;
};

exports.update = async (id, payment) => {
  const result = await db.callProcedure('UpdatePayment', [
    id,
    payment.payment_method,
    payment.amount,
  ]);

  const affected = result.affectedRows || result[0]?.affectedRows || result[1]?.affectedRows || 0;
  return affected === 1;
};

exports.delete = async (id) => {
  const result = await db.callProcedure('DeletePayment', [id]);

  const affected = result.affectedRows || result[0]?.affectedRows || result[1]?.affectedRows || 0;
  return affected === 1;
};
