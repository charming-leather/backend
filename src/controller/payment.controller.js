const Error = require("../errors/apiError");
const database = require("../repository/payment.repository");

exports.getPaymentById = async (id) => {
  const payment = await database.getById(id);
  if (!payment || payment.length === 0) {
    throw Error.notFound("Payment not found");
  }
  return payment;
};

exports.getAllPayments = async () => {
  return await database.getAll();
};

exports.createPayment = async (payment) => {
  if (
    !payment.order_id ||
    !payment.payment_method ||
    !payment.amount ||
    !payment.reference_number
  ) {
    throw Error.badRequest(
      "Missing required fields: order_id, payment_method, amount, or reference_number"
    );
  }

  try {
    return await database.add(payment);
  } catch (err) {
    console.error("Database error in createPayment:", err);
    throw Error.internal("Something went wrong while creating the payment");
  }
};

exports.updatePayment = async (id, paymentData) => {
  if (!paymentData.amount || !paymentData.payment_method) {
    throw Error.badRequest("Missing required fields: amount or payment_method");
  }

  try {
    const updated = await database.update(id, paymentData);
    if (!updated) {
      throw Error.notFound("Payment not found to update");
    }
    return { message: "Payment updated successfully" };
  } catch (err) {
    console.error("Database error in updatePayment:", err);  // <---- Add this line
    throw Error.internal("Could not update payment");
  }
};


exports.deletePayment = async (id) => {
  try {
    const deleted = await database.delete(id);
    if (!deleted) {
      throw Error.notFound("Payment not found to delete");
    }
    return { message: "Payment deleted successfully" };
  } catch (err) {
    console.error("Database error in deletePayment:", err);
    throw Error.internal("Could not delete payment");
  }
};
