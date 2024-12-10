const express = require('express');
const { getAllProducts, createProduct, upload } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Create a product (admin only)
router.post('/', protect,upload.single('image'), createProduct);

module.exports = router;
