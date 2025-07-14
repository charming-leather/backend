const Error = require("../errors/apiError");
const database = require("../repository/customer.repository");

exports.getCustomerById = async (id) => {
  const customer = await database.getById(id);

  if (!customer || customer.length === 0) {
    throw Error.notFound("Customer not found");
  }

  return customer;
};

exports.getAllCustomers = async () => {
  return await database.getAll();
};

exports.createCustomer = async (customer) => {
  // Validate required fields before inserting
  if (!customer.name || !customer.email || !customer.phone) {
    throw Error.badRequest("Missing required fields: name, email, or phone");
  }

  try {
    return await database.add(customer);
  } catch (err) {
    console.error("Database error in createCustomer:", err);

    if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
      throw Error.conflict("Duplicate customer (email or phone already exists)");
    }

    throw Error.internal("Something went wrong while creating the customer");
  }
};

exports.updateCustomer = async (id, customerData) => {
  try {
    const updated = await database.update(id, customerData);

    if (!updated) {
      throw Error.notFound("Customer not found to update");
    }

    return updated;
  } catch (err) {
    console.error("Database error in updateCustomer:", err);
    throw Error.internal("Could not update customer");
  }
};

exports.deleteCustomer = async (id) => {
  try {
    const deleted = await database.delete(id);

    if (!deleted) {
      throw Error.notFound("Customer not found to delete");
    }

    return deleted;
  } catch (err) {
    console.error("Database error in deleteCustomer:", err);
    throw Error.internal("Could not delete customer");
  }
};
