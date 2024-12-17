const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

dotenv.config();

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();


const authRoutes = require('./routes/authRoutes');

const productRoutes = require('./routes/productRoutes');
 const orderRoutes = require('./routes/orderRoutes');

 app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
