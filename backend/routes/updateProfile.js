const express = require('express');
const router = express.Router();
const db = require("../config/dj");

router.put('/updateprofile/:userID', (req, res) => {
    const userID = req.params.userID;
    const { fullName, email, address, address2, city, zipcode, selectedSkills, state } = req.body; 

    try {
        if (!userID || !email) {
            throw new Error('User ID and email are required.');
        }

        const sql = `
            UPDATE User 
            SET 
                fullName = ?, 
                email = ?, 
                address = ?, 
                address2 = ?, 
                city = ?, 
                zipcode = ?, 
                selectedSkills = ?, 
                state = ? 
            WHERE userID = ?`;
        
        db.query(sql, [fullName, email, address, address2, city, zipcode, selectedSkills, state, userID], (err, results) => {
            if (err) {
                console.error('Database update error:', err.message);
                return res.status(500).json({ message: 'Internal Server Error', error: err.message });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            console.log('Profile updated:', { userID, fullName, email, address, address2, city, zipcode, selectedSkills, state });

            res.status(200).json({ message: 'Profile updated successfully', user: { userID, email } });
        });

    } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
