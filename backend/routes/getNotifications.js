const express = require('express');
const router = express.Router();
const db = require ('../config/dj');

router.get('/getNotifications/:userID', async (req, res) => {
    const userID = req.params.userID;

    try {
        const [notifications] = await db.query(
            `SELECT nID, rEventsID, notificationStatus, notificationMessage 
            FROM Notification
            WHERE userID = ?`, 
            [userID]
        );

        if (notifications.length === 0) {
            res.status(404).send({ error: 'No notifications found for the given userID' });
        } else {
            res.send(notifications);
        }
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).send({ error: 'An error occurred while fetching notifications' });
    }
});

module.exports = router;
