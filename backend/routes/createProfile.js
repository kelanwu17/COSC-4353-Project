const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require("../config/dj");

router.post('/createprofile', async (req, res) => {
    const { fullName, email, password, address, address2, city, zipcode, selectedSkills, state } = req.body; 

    try {
        if (!email || !password) {
            throw new Error('Email and password are required.'); 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO User (fullName, email, password, address, address2, city, zipcode, selectedSkills, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, [fullName, email, hashedPassword, address, address2, city, zipcode, selectedSkills, state], (err, results) => {        
            if (err) {
                console.error('Database insert error:', err.message);
                return res.status(500).json({ message: 'Internal Server Error', error: err.message });
            }

            const userID = results.insertId;

            console.log('Profile created:', { userID, fullName, email, address, address2, city, zipcode, selectedSkills, state }); 

            res.status(201).json({ message: 'Profile created successfully', user: { userID, email } });
        });
        
    } catch (error) {
        console.error('Error creating profile:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
