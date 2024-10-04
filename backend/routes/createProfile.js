// routes/createProfile.js
const express = require('express');
const router = express.Router();

// POST /createprofile route
router.post('/', (req, res) => {
    const { email, password } = req.body;
    console.log("Received signup request:", req.body);

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Simulate saving the profile (e.g., to a database)
    // For now, just respond with a success message
    res.status(201).json({ message: 'Profile created successfully!', email });
});

module.exports = router;
