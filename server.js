const express = require('express');
const app = express();
app.use(express.json());

let orders = [];
let orderIdCounter = 1;

app.get('/orders', (req, res) => {
  res.json(orders);
});

app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).send('Order not found');
  res.json(order);
});

app.post('/orders', (req, res) => {
  const newOrder = { id: orderIdCounter++, ...req.body };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.put('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).send('Order not found');
  Object.assign(order, req.body);
  res.json(order);
});

app.delete('/orders/:id', (req, res) => {
  orders = orders.filter(o => o.id !== parseInt(req.params.id));
  res.sendStatus(204);
});

// Export app for testing
module.exports = app;
