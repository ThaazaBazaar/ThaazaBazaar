const Product = require('../models/Product');
const { s3, upload } = require('../config/multerAWS'); 
const mongoose = require("mongoose");

// Create a product with image upload
const createProduct = async (req, res) => {
    
    const { name, description, category, old_price, new_price,stock_status} = req.body;

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
            stock_status,
            image: imageUrl, 
            // Store the S3 image URL in the database
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
const deleteProduct = async (req, res) => {
    try {

         const { id } = req.params;

         // Validate the ID
         if (!mongoose.Types.ObjectId.isValid(id)) {
           return res.status(400).json({ message: "Invalid product ID" });
        }
        
        // Find the product by ID and delete it
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting product' });
    }
}

const updateProduct = async (req, res) => {
    try {
         const { id } = req.params;

         // Validate the ID
         if (!mongoose.Types.ObjectId.isValid(id)) {
           return res.status(400).json({ message: "Invalid product ID" });
         }

        const { name, description, category, new_price, old_price, stock_status } = req.body;
        
        // Find the product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // If a new image is uploaded, upload it to S3 and get the URL
        let imageUrl = product.image; // Keep the existing image if no new image is uploaded

        if (req.file) {
            // Set up S3 upload parameters
            const params = {
                Bucket: process.env.AWS_S3_BUCKET, // Your bucket name
                Key: `products/${Date.now()}_${req.file.originalname}`, // File name in S3
                Body: req.file.buffer,
                ContentType: req.file.mimetype, // MIME type
                // ACL: 'public-read', // Make the file public
            };

            // Upload the image to S3
            const data = await s3.upload(params).promise();

            // Get the URL of the uploaded image
            imageUrl = data.Location;
        }

        // Update product details
        product.name = name || product.name;
        product.description = description || product.description;
        product.category = category || product.category;
        product.new_price = new_price || product.new_price;
        product.old_price = old_price || product.old_price;
        product.stock_status = stock_status || product.stock_status;
        product.image = imageUrl; // Update image URL if a new image was uploaded

        // Save the updated product
        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product' });
    }
}

// fetch a single product
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
};
module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById
};
