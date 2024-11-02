const express = require('express');
const bcrypt = require('bcrypt'); // Ensure bcrypt is imported
const router = express.Router();
const db = require("../config/dj");

router.post('/logIn', async (req, res) => {
    const { username, password } = req.body; // Changed email to username

    try {
        if (!username || !password) {
            throw new Error('Username and password are required.'); // Updated error message
        }

        // Query to find the user by username
        const sql = "SELECT * FROM User WHERE email = ?"; // Change email to username in the query
        db.query(sql, [username], async (err, results) => {
            if (err) {
                console.error('Database query error:', err.message);
                return res.status(500).json({ message: 'Internal Server Error', error: err.message });
            }

            if (results.length > 0) {
                const user = results[0];

                // Compare the provided password with the hashed password
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return res.status(401).json({ message: 'Invalid username or password.' }); // Updated error message
                }

                const userDetails = {
                    userID: user.userID, // Ensure this matches the actual column name in your DB
                    fullName: user.fullName,
                    username: user.email, // Updated to include username
                    address: user.address,
                    address2: user.address2,
                    city: user.city,
                    zipcode: user.zipcode,
                    selectedSkills: user.selectedSkills,
                    state: user.state
                };

                console.log('User details sent:', userDetails);
                return res.status(200).json({ message: 'Login successful', userDetails });
            }
            
            return res.status(401).json({ message: 'Invalid username or password.' }); // Updated error message
        });

    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
