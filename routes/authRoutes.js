const express = require('express');
const { registerUser, loginUser, handlePhoneNumber } = require('../controllers/authController');
const router = express.Router();

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

router.post('/auth', handlePhoneNumber);

module.exports = router;
