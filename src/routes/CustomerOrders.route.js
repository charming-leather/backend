const express = require ( 'express');
const router = express.Router ();
const controller = require ('../controller/customerSOrders.controller');

router.post('/addCustomerOrder', controller.addOrder);
router.get('/getCustomer/:id',controller,getOrderById);
router.get('/getAllCustomerOrders'.controller.getAllOrders);
router.put('/UpdateCustomerOrder/:id',controller.updateOrder);
router.delete('/deleteCustomerOrder/:id',controller.deleteOrder);

module.export = router;