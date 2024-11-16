const express = require('express');
const router = express.Router();
const db = require('../config/dj'); 

router.post('/createNotification', async (req, res) => {
    const { userID, eventsID, notificationMessage } = req.body;

    try {
       const notif= 'INSERT INTO Notification (userID, eventsID, notificationStatus, notificationMessage) VALUES (?, ?, ?, ?)';
        db.query(
            notif,[userID, eventsID, 'pending', notificationMessage] // Set initial status as 'pending'
            , (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("DB error")
                }
                res.status(201).send({ success: true, message: 'Notification added', nID: result.insertId });
            }
        );

        
    } catch (error) {
        console.error('Error adding notification:', error);
        res.status(500).send({ success: false, error: 'Failed to add notification' });
    }
});

module.exports = router;
