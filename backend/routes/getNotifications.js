const express = require('express');
const { errorMonitor } = require('nodemailer/lib/xoauth2');
const router = express.Router();
<<<<<<< HEAD
const db = require ('../config/dj').promise();
=======

const db = require ('../config/dj').promise();

>>>>>>> f4d9a09d0d8ac2f478bf0c9fbb93de19578ef3cd

router.get('/getNotifications/:userID', async (req, res) => {
    const userID = req.params.userID;

    try {
        const [notifications] = await db.query(
<<<<<<< HEAD
            `SELECT nID, eventsID, notificationStatus, notificationMessage 
            FROM Notification 
=======

            `SELECT nID, eventsID, notificationStatus, notificationMessage 
            FROM Notification 

>>>>>>> f4d9a09d0d8ac2f478bf0c9fbb93de19578ef3cd
            WHERE userID = ?`, 
            [userID]
        );

        if (notifications.length === 0) {
            res.status(404).send({ error: 'No notifications found for the given userID' });
        } else {
            res.send(notifications);
        }
    } catch (error) {
<<<<<<< HEAD
        console.error('Error fetching notifications:', error.message || error);
        console.error('Error fetching notifications', userID);
=======

        console.error('Error fetching notifications:', error.message || error);
        console.error('Error fetching notifications', userID);

>>>>>>> f4d9a09d0d8ac2f478bf0c9fbb93de19578ef3cd
        res.status(500).send({ error: 'An error occurred while fetching notifications' });
    }
});

module.exports = router;
