// /routes/getNotifications.js
const express = require('express');
const { errorMonitor } = require('nodemailer/lib/xoauth2');
const router = express.Router();
const db = require ('../config/dj').promise();

router.get('/getNotifications/:userID', async (req, res) => {
    const userID = req.params.userID;

    try {
        const [notifications] = await db.query(
            `SELECT DISTINCT n.nID, n.eventsID, n.notificationStatus, n.notificationMessage
            FROM Notification n, Events e
            WHERE n.userID = ?
            AND n.eventsID = e.eventsID
            AND e.startTime BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 3 DAY)`, 
            [userID]
        );
        

        if (notifications.length === 0) {
            res.status(404).send({ error: 'No notifications found for the given userID' });
        } else {
            res.send(notifications);
        }
    } catch (error) {
        console.error('Error fetching notifications:', error.message || error);
        console.error('Error fetching notifications', userID);
        res.status(500).send({ error: 'An error occurred while fetching notifications' });
    }
});

module.exports = router;