const Product = require('../models/Product');
const AWS = require('aws-sdk');
const multer = require('multer');

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, 
});

// Multer configuration for handling image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a product with image upload
const createProduct = async (req, res) => {
    const { name, description, category, old_price, new_price } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'No image provided' });
    }

    // Set up S3 upload parameters
    const params = {
        Bucket: process.env.AWS_S3_BUCKET, // Your bucket name
        Key: `products/${Date.now()}_${req.file.originalname}`, // The file name in S3
        Body: req.file.buffer,
        ContentType: req.file.mimetype, // MIME type
        // ACL: 'public-read' // Access control (public-read makes it publicly accessible)
    };

    try {
        // Upload image to S3
        const data = await s3.upload(params).promise();
        
        // Get the URL of the uploaded image
        const imageUrl = data.Location;

        // Create new product
        const product = new Product({
            name,
            description,
            category,
            old_price,
            new_price,
            image: imageUrl, // Store the S3 image URL in the database
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading image' });
    }
};




// Get All Products
const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

// Create New Product (Admin only)
// const createProduct = async (req, res) => {
//     const { name, description, category, old_price, new_price, image } = req.body;

//     const product = new Product({
//         name,
//         description,
//         category,
//         old_price,
//         new_price,
//         image,
//     });

//     const createdProduct = await product.save();
//     res.status(201).json(createdProduct);
// };

module.exports = {
    getAllProducts,
    createProduct,
    upload,
};
