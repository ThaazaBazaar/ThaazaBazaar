const express = require('express');
const { getAllProducts, createProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { s3, upload } = require('../config/multerAWS'); 
const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Create a product (admin only)
router.post('/',protect,upload,createProduct);

router.delete('/products/:id',deleteProduct);
router.put('/products/:id',upload,updateProduct);

module.exports = router;
