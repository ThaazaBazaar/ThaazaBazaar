const express = require('express');
const { createOrder, getAllOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Create order
router.post('/', protect, createOrder);

// Get all orders (admin only)
router.get('/',  getAllOrders);

module.exports = router;
