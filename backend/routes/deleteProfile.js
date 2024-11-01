const express = require('express');
const router = express.Router();
const db = require("../config/dj");

router.delete('/deleteprofile/:userID', (req, res) => {
    const { userID } = req.params;

    try {
        if (!userID) {
            throw new Error('User ID is required.');
        }

        const sql = "DELETE FROM User WHERE userID = ?";
        db.query(sql, [userID], (err, results) => {
            if (err) {
                console.error('Database delete error:', err.message);
                return res.status(500).json({ message: 'Internal Server Error', error: err.message });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            console.log('Profile deleted:', { userID });
            res.status(200).json({ message: 'Profile deleted successfully', userID });
        });
        
    } catch (error) {
        console.error('Error deleting profile:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
