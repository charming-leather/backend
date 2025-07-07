const db = require('../config/db');

exports.getById = async (id) => {
  const result = await db.query('SELECT * FROM customers WHERE customer_id = ?', [id]);
  return result[0];
};

exports.getAll = async () => {
  const result = await db.callProcedure('GetAllCustomers');
  return result[0];
};

exports.findByEmail = async (email) => {
  const result = await db.callProcedure('GetCustomerByEmail', [email]);
  return result[0][0];
};

exports.add = async (customer) => {
  const result = await db.callProcedure('AddCustomer', [
    customer.name,
    customer.email,
    customer.phone,
  ]);
  if (result.affectedRows === 1) {
    return {
      success: true,
    };
  }
};

exports.update = async (id, customer) => {
  const result = await db.callProcedure('UpdateCustomer', [
    id,
    customer.name,
    customer.email,
    customer.phone,
  ]);
  return result.affectedRows === 1;
};

exports.delete = async (id) => {
  const result = await db.callProcedure('DeleteCustomer', [id]);
  return result.affectedRows === 1;
};
