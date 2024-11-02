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

        const userSql = "SELECT * FROM User WHERE email = ? AND password = ?";
        db.query(userSql, [username, password], (err, userResults) => {
            if (err) {
                console.error('Database query error:', err.message);
                return res.status(500).json({ message: 'Internal Server Error', error: err.message });
            }

            // If user is found in the User table
            if (userResults.length > 0) {
                const user = userResults[0];
                const userDetails = {
                    userID: user.userID,
                    fullName: user.fullName,
                    email: user.email,
                    address: user.address,
                    address2: user.address2,
                    city: user.city,
                    zipcode: user.zipcode,
                    selectedSkills: user.selectedSkills,
                    state: user.state
                };

                console.log('User details sent:', userDetails); 
                return res.status(200).json({ message: 'Login successful', userDetails, userType: 'user' });
            } 
            
            // If user is not found, check the Admin table
            const adminSql = "SELECT * FROM Admin WHERE email = ? AND password = ?";
            db.query(adminSql, [username, password], (err, adminResults) => {
                if (err) {
                    console.error('Database query error:', err.message);
                    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
                }

                if (adminResults.length > 0) {
                    const admin = adminResults[0];
                    const adminDetails = {
                        adminID: admin.id, 
                        email: admin.email
                    };

                    console.log('Admin details sent:', adminDetails);
                    return res.status(200).json({ message: 'Admin login successful', adminDetails, userType: 'admin' });
                }

                // If neither user nor admin credentials match
                return res.status(401).json({ message: 'Invalid username or password.' });
            });
        });

    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = { router, userDetails };
