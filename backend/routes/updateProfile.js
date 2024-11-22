const express = require('express');
const router = express.Router();
const db = require('../config/dj');
const bcrypt = require('bcrypt');

router.put('/updateprofile/:userID', async (req, res) => {
    const userID = req.params.userID;
    const { fullName, email, password, address, address2, city, zipcode, selectedSkills, state } = req.body;

    // Validate input
    if (!userID || !email) {
        return res.status(400).json({ message: 'User ID and email are required.' });
    }

    // Ensure the password exists and is a string
    if (!password || typeof password !== 'string' || password.trim() === '') {
        return res.status(400).json({ message: 'Password is required and must be a non-empty string.' });
    }

    try {
        // Hash the password before updating
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare the SQL query to update the user profile
        const sql = `
            UPDATE User 
            SET 
                fullName = ?, 
                email = ?, 
                password = ?,
                address = ?, 
                address2 = ?, 
                city = ?, 
                zipcode = ?, 
                selectedSkills = ?, 
                state = ? 
            WHERE userID = ?`;

        // Execute the SQL query with the hashed password
        db.query(sql, [fullName, email, hashedPassword, address, address2, city, zipcode, selectedSkills, state, userID], (err, results) => {
            if (err) {
                console.error('Database update error:', err.message);
                return res.status(500).json({ message: 'Internal Server Error', error: err.message });
            }

            // Check if the user was found and updated
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            console.log('Profile updated:', { userID, fullName, email, address, address2, city, zipcode, selectedSkills, state });
            res.status(200).json({ message: 'Profile updated successfully', user: { userID, email } });
        });

    } catch (err) {
        console.error('Error hashing password:', err.message);
        return res.status(500).json({ message: 'Error hashing password', error: err.message });
    }
});

module.exports = router;
