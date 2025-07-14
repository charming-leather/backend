const {getPaymentById, getAllPayments, createPayment, updatePayment, deletePayment } = require('./payment.controller');

jest.mock('../repository/payment.repository');

const { getById, getAll, add, update, delete: mockDelete } = require('../repository/payment.repository');


describe('getPaymentById', () => {
  const mockPayment = {
    payment_id: 1,
    order_id: 10,
    payment_method: "Cash",
    amount: 500.00,
    reference_number: "214009"
  };

  it('should return payment if found', async () => {
    getById.mockResolvedValue(mockPayment);
    const result = await getPaymentById(1);
    expect(result).toEqual(mockPayment);
  });

  it('should throw notFound error if payment not found', async () => {
    getById.mockResolvedValue(null);

    await expect(getPaymentById(999)).rejects.toThrow("Payment not found");
  });
});



describe('getAllPayments', () => {
  const mockPayments = [
    {
      payment_id: 1,
      order_id: 10,
      payment_method: "Credit Card",
      amount: 500.00,
      reference_number: "45678"
    },
    {
      payment_id: 2,
      order_id: 11,
      payment_method: "EFT",
      amount: 200.00,
      reference_number: "8763"
    }
  ];

  it('should return all payments', async () => {
    getAll.mockResolvedValue(mockPayments);
    const result = await getAllPayments();
    expect(result).toEqual(mockPayments);
  });
});



describe('createPayment', () => {
  const validPayment = {
    order_id: 1,
    payment_method: "Cash",
    amount: 150.00,
    reference_number: "REF987"
  };

  it('should add and return new payment', async () => {
    add.mockResolvedValue({ ...validPayment, payment_id: 3 });
    const result = await createPayment(validPayment);
    expect(result).toEqual({ ...validPayment, payment_id: 3 });
  });

  it('should throw badRequest error if required fields missing', async () => {
    const invalid = { order_id: 1 };
    await expect(createPayment(invalid)).rejects.toThrow("Missing required fields");
  });
});



describe('updatePayment', () => {
  const updateData = {
    payment_method: "Card",
    amount: 300
  };

  it('should update payment and return success message', async () => {
    update.mockResolvedValue(true);
    const result = await updatePayment(1, updateData);
    expect(result).toEqual({ message: "Payment updated successfully" });
  });
});



describe('deletePayment', () => {
  it('should delete payment and return success message', async () => {
    mockDelete.mockResolvedValue(true);
    const result = await deletePayment(1);
    expect(result).toEqual({ message: "Payment deleted successfully" });
  });
});
