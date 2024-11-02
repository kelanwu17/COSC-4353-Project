const express = require('express');
const router = express.Router();
const db = require('../config/dj');
const axios = require('axios');

// Route to register an event for a user
router.post('/registerEvent', async (req, res) => {
    const { userID, eventsID } = req.body;

    // Basic validation
    if (!userID || !eventsID) {
        return res.status(400).json({ message: "User ID and Event ID are required." });
    }

    const sql = "INSERT INTO RegisterEvents (userID, eventsID) VALUES (?, ?)";
    
    // Register the event for the user
    db.query(sql, [userID, eventsID], async (err, result) => {
        if (err) {
            console.error("Error registering event for user", err);
            return res.status(500).send("Error registering event in db.");
        }

        // Create a notification after successful registration
        const notificationMessage = `You have successfully registered for event ID ${eventsID}.`;
        const notificationData = {
            userID,
            rEventsID: eventsID,
            notificationMessage,
            notificationStatus: 'pending' 
        };

        try {
            await axios.post('http://localhost:3001/api/createNotification', notificationData);
            console.log('Notification created successfully.');
        } catch (notificationError) {
            console.error('Error sending notification', notificationError);
        }

        res.status(201).json({ message: "Event registered successfully", rEventsID: result.insertId });
    });
});

module.exports = router;

