const express = require('express');
const router = express.Router();
const ordersController = require('../controller/orders.controller');

// Get all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await ordersController.getAllOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});
// Get order by ID
router.get('/:id', async (req, res, next) => {
  try {
    const orders = await ordersController.getOrdersById(req.params.id);
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// Create new order
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await ordersController.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});

// Update Order by ID
router.put('/:id', async (req, res, next) => {
  try {
    const updatedOrder = await ordersController.updateOrder(req.params.id, req.body);
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
});

// Delete order by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await ordersController.deleteOrder(req.params.id);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
