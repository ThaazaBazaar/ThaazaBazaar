const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// Handle phone number authentication
const handlePhoneNumber = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        let user = await User.findOne({ phoneNumber });

        // If the user doesn't exist, create a new user
        if (!user) {
            user = new User({ phoneNumber, isVerified: true });
            await user.save();
        }

        // Generate a JWT token
        const token = generateToken(user._id);

        // Send the JWT token to the frontend
        res.status(200).json({
            _id: user._id,
            phoneNumber: user.phoneNumber,
            isVerified: user.isVerified,
            token, // Return JWT token to frontend
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Register User
const registerUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin === 'true',
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    handlePhoneNumber,
};
