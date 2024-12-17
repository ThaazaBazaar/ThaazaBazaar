const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        
    },
    stock_status: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
