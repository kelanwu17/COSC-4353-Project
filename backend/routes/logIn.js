const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // Fixed import to destructure properly

const sessions = {};

router.post('/logIn', (req, res) => {
    const { username, password } = req.body; 
   
    try {
        if (!username || !password) {
            throw new Error('Email and password are required.'); 
        }

        if (username === "admin" && password === "admin") {
            const sessionId = uuidv4();
            sessions[sessionId] = { username, userId: 1 };

            res.set('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Path=/;`); 
        }

        return res.status(401).json({ message: 'Invalid username or password.' });

    } catch (error) {
        console.error('Error creating profile:', error.message);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = { router, sessions };
