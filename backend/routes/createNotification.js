const express = require('express');
const router = express.Router();
const db = require('./database'); // Your database connection

router.post('/createNotification', async (req, res) => {
    const { userID, rEventsID, notificationMessage } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO notifications (userID, rEventsID, notificationStatus, notificationMessage) VALUES (?, ?, ?, ?)',
            [userID, rEventsID, 'pending', notificationMessage] // Set initial status as 'pending'
        );

        res.status(201).send({ success: true, message: 'Notification added', nID: result.insertId });
    } catch (error) {
        console.error('Error adding notification:', error);
        res.status(500).send({ success: false, error: 'Failed to add notification' });
    }
});

module.exports = router;
