const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // Fixed import to destructure properly
const db = require("../config/dj");

const userDetails = {}; // Object to store user details

router.post('/logIn', (req, res) => {
    const { username, password } = req.body; 

    try {
        if (!username || !password) {
            throw new Error('Username and password are required.');
        }

        const sql = "SELECT * FROM User WHERE email = ? AND password = ?";
        db.query(sql, [username, password], (err, results) => {
            if (err) {
                console.error('Database query error:', err.message);
                return res.status(500).json({ message: 'Internal Server Error', error: err.message });
            }

            if (results.length > 0) {
                const user = results[0];
                const userDetails = {
                    userID: user.userID, // Ensure this matches the actual column name in your DB
                    fullName: user.fullName,
                    email: user.email,
                    address: user.address,
                    address2: user.address2,
                    city: user.city,
                    zipcode: user.zipcode,
                    selectedSkills: user.selectedSkills,
                    state: user.state
                };
                
                console.log('User details sent:', userDetails); // Log user details being sent
                return res.status(200).json({ message: 'Login successful', userDetails });
            }
            return res.status(401).json({ message: 'Invalid username or password.' });
        });

    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


module.exports = { router, userDetails };
