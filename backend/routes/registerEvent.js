const express = require('express');
const router = express.Router();
const db = require('../config/dj');

// Route to register an event for a user
router.post('/registerEvent', (req, res) => {
    const { userID, eventsID } = req.body;

    // Basic validation
    if (!userID || !eventsID) {
        return res.status(400).json({ message: "User ID and Event ID are required." });
    }

    const sql = "INSERT INTO RegisterEvents (userID, eventsID) VALUES (?, ?)";
    
    // Register the event for the user
    db.query(sql, [userID, eventsID], (err, result) => {
        if (err) {
            console.error("Error registering event for user", err);
            return res.status(500).send("Error registering event in db.");
        }
        res.status(201).json({ message: "Event registered successfully", rEventsID: result.insertId });
    });
});


module.exports = router;