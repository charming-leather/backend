const express = require('express');
const router = express.Router();
const paymentController = require('../controller/payment.controller');

// Get all payments
router.get('/', async (req, res, next) => {
  try {
    const payments = await paymentController.getAllPayments();
    res.json(payments);
  } catch (err) {
    next(err);
  }
});

// Get payment by ID
router.get('/:id', async (req, res, next) => {
  try {
    const payment = await paymentController.getPaymentById(req.params.id);
    res.json(payment);
  } catch (err) {
    next(err);
  }
});

// Create new payment
router.post('/', async (req, res, next) => {
  try {
    const newPayment = await paymentController.createPayment(req.body);
    res.status(201).json(newPayment);
  } catch (err) {
    next(err);
  }
});

// Update payment by ID
router.put('/:id', async (req, res, next) => {
  try {
    const updatedPayment = await paymentController.updatePayment(req.params.id, req.body);
    res.json(updatedPayment);
  } catch (err) {
    next(err);
  }
});

// Delete payment by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await paymentController.deletePayment(req.params.id);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
