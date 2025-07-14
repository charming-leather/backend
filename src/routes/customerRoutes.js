const express = require('express');
const router = express.Router();
const customerController = require('../controller/customer.controller');

// Get all customers
router.get('/', async (req, res, next) => {
  try {
    const customers = await customerController.getAllCustomers();
    res.json(customers);
  } catch (err) {
    next(err);
  }
});

// Get customer by ID
router.get('/:id', async (req, res, next) => {
  try {
    const customer = await customerController.getCustomerById(req.params.id);
    res.json(customer);
  } catch (err) {
    next(err);
  }
});

// Create new customer
router.post('/', async (req, res, next) => {
  try {
    const newCustomer = await customerController.createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    next(err);
  }
});

// Update customer by ID
router.put('/:id', async (req, res, next) => {
  try {
    const updatedCustomer = await customerController.updateCustomer(req.params.id, req.body);
    res.json(updatedCustomer);
  } catch (err) {
    next(err);
  }
});

// Delete customer by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await customerController.deleteCustomer(req.params.id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
