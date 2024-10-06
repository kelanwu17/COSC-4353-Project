const express = require('express');
const router = express.Router();

router.post('/logIn', (req, res) => {
    const { email, password} = req.body; 

    try {
        if (!email || !password) {
            throw new Error('Email and password are required.'); 
        }

        console.log('Profile created:', { email, password}); 


        res.status(201).json({ message: 'Profile created successfully', user: { email } });
    } catch (error) {
        console.error('Error creating profile:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;