// Mock the orders repository before importing controller functions
jest.mock('../repository/orders.repository');

const {
  getOrderById,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder
} = require('./orders.controller');

const {
  getById,
  getAll,
  add,
  update,
  delete: mockDelete
} = require('../repository/orders.repository');

describe('getOrderById', () => {
  const mockOrder = {
    order_id: 101,
    customer_id: 1,
    product_id: 5,
    quantity: 3,
    order_date: '2025-07-21',
  };

  it('should return the correct order by ID', async () => {
    getById.mockResolvedValue(mockOrder);
    const result = await getOrderById(101);
    expect(result).toEqual(mockOrder);
  });
});

describe('getAllOrders', () => {
  const mockOrders = [
    {
      order_id: 101,
      customer_id: 1,
      product_id: 5,
      quantity: 3,
      order_date: '2025-07-21',
    },
    {
      order_id: 102,
      customer_id: 2,
      product_id: 3,
      quantity: 1,
      order_date: '2025-07-20',
    },
  ];

  it('should return all orders', async () => {
    getAll.mockResolvedValue(mockOrders);
    const result = await getAllOrders();
    expect(result).toEqual(mockOrders);
  });
});

describe('createOrder', () => {
  const newOrder = {
    order_id: 104,
    customer_id: 1,
    product_id: 5,
    quantity: 3,
    order_date: '2025-07-22',
    payment_method: 'Credit Card',
    amount: 100,
    reference_number: 'REF123',
  };

  const savedOrder = {
    ...newOrder,
  };

  it('should add a new order', async () => {
    add.mockResolvedValue(savedOrder);
    const result = await createOrder(newOrder);
    expect(result).toEqual(savedOrder);
  });
});

describe('updateOrder', () => {
  const updateData = {
    amount: 150,
    order_method: 'PayPal',
  };

  const updatedOrder = {
    order_id: 101,
    customer_id: 1,
    product_id: 5,
    quantity: 3,
    order_date: '2025-07-21',
    ...updateData,
  };

  it('should update the order', async () => {
    update.mockResolvedValue(updatedOrder);
    const result = await updateOrder(101, updateData);
    expect(result).toEqual(updatedOrder);
  });
});

describe('deleteOrder', () => {
  const deletedOrder = {
    order_id: 101,
    customer_id: 1,
    product_id: 5,
    quantity: 3,
    order_date: '2025-07-21',
  };

  it('should delete the order', async () => {
    mockDelete.mockResolvedValue(deletedOrder);
    const result = await deleteOrder(101);
    expect(result).toEqual(deletedOrder);
  });
});
