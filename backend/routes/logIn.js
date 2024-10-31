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

               
                userDetails.userID = user.id; 
                userDetails.fullName = user.fullName;
                userDetails.email = user.email;
                userDetails.password = user.password; 
                userDetails.address = user.address;
                userDetails.address2 = user.address2;
                userDetails.city = user.city;
                userDetails.zipcode = user.zipcode;
                userDetails.selectedSkills = user.selectedSkills; 

                
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
