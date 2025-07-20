const request = require('supertest');
const app = require('./server');

describe('Orders API', () => {
  let orderId;

  it('should create a new order', async () => {
    const res = await request(app)
      .post('/orders')
      .send({
        customer_id: 1,
        order_date: "2025-07-20",
        status: "Pending",
        items: [
          { product_id: 101, quantity: 1, price: 100 }
        ],
        total_amount: 100
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    orderId = res.body.id;
  });

  it('should get all orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get an order by ID', async () => {
    const res = await request(app).get(`/orders/${orderId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(orderId);
  });

  it('should update an order', async () => {
    const res = await request(app)
      .put(`/orders/${orderId}`)
      .send({ status: "Shipped" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("Shipped");
  });

  it('should delete an order', async () => {
    const res = await request(app).delete(`/orders/${orderId}`);
    expect(res.statusCode).toEqual(204);
  });
});
