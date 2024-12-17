const express = require('express');
const { getAllProducts, createProduct, deleteProduct, updateProduct, getProductById } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { s3, upload } = require('../config/multerAWS'); 
const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Create a product (admin only)
router.post('/',upload,createProduct);

//get a single product

router.get('/:id',getProductById);
router.delete('/:id',deleteProduct);
router.put('/:id',upload,updateProduct);

module.exports = router;
