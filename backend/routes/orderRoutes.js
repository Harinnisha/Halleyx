const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define specific routes first (otherwise :id will catch 'status', 'product', etc)
router.get('/status/:status', orderController.getOrdersByStatus);
router.get('/product/:product', orderController.getOrdersByProduct);
router.get('/date-range', orderController.getOrdersByDateRange); // requires query params ?startDate=...&endDate=...

// General routes
router.route('/')
  .get(orderController.getOrders)
  .post(orderController.createOrder);

router.route('/:id')
  .get(orderController.getOrderById)
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
