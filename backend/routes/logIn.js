const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // Fixed import to destructure properly

const sessions = {};
router.post('/logIn', (req, res) => {
    const { username, password } = req.body; 
   
    try {
        if (!username || !password) {
            throw new Error('Username and password are required.');
        }

        if (username === "admin" && password === "admin") {
            const sessionId = uuidv4();
            sessions[sessionId] = { username, userId: 1 };

            // Send sessionId and success message
            return res.status(200).json({ message: 'Login successful', sessionId });
        }
        
        if(password !== "admin")
        {
            
        }
        // If username and password don't match, send 401 error
        return res.status(401).json({ message: 'Invalid username or password.' });

    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


module.exports = { router, sessions };
