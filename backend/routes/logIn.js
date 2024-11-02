const express = require('express');
const bcrypt = require('bcrypt'); // Make sure to import bcrypt
const router = express.Router();
const db = require("../config/dj");

router.post('/logIn', async (req, res) => {
    const { username, password } = req.body; // Expecting username for both user and admin

    try {
        if (!username || !password) {
            throw new Error('Username and password are required.');
        }

        // First, check if the username belongs to a user
        const userSql = "SELECT * FROM User WHERE email = ?";
        db.query(userSql, [username], async (err, userResults) => {
            if (err) {
                console.error('Database query error (User):', err.message);
                return res.status(500).json({ message: 'Internal Server Error', error: err.message });
            }

            // Check if a user was found
            if (userResults.length > 0) {
                const user = userResults[0];
                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    console.log('User login failed: Invalid password.');
                    return res.status(401).json({ message: 'Invalid username or password.' });
                }

                const userDetails = {
                    userID: user.userID,
                    fullName: user.fullName,
                    username: user.email,
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

            // If not a user, check if it's an admin login
            const adminSql = "SELECT * FROM Admin WHERE email = ?";
            db.query(adminSql, [username], async (err, adminResults) => {
                if (err) {
                    console.error('Database query error (Admin):', err.message);
                    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
                }

                // Check if an admin was found
                if (adminResults.length > 0) {
                    const admin = adminResults[0];
                    console.log('Admin found:', admin.email); // Log found admin email

                    const match = await bcrypt.compare(password, admin.password);
                    if (!match) {
                        console.log('Admin login failed: Invalid password.');
                        return res.status(401).json({ message: 'Invalid username or password.' });
                    }

                    const adminDetails = {
                        adminID: admin.adminID,
                        email: admin.email,
                    };

                    console.log('Admin details sent:', adminDetails);
                    return res.status(200).json({ message: 'Admin login successful', adminDetails });
                }

                // If no user or admin was found, return invalid credentials
                return res.status(401).json({ message: 'Invalid username or password.' });
            });
        });

    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
