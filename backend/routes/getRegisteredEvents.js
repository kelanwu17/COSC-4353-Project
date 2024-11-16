const express = require('express');
const router = express.Router();
const { registeredEvents } = require('./registeredEvents');
const db = require('../config/dj');

// Route to fetch all registered events
router.get('/registeredEvents', (req, res) => {
    const sql = "SELECT * FROM RegisterEvents";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error retrieving registered events", err)
            return res.status(500).send("Error getting registered events from db")
        }
        res.status(200).json(result);

    })

});

router.get('/registeredEvents/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM RegisterEvents WHERE userID = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error getting registered event", err);
            return res.status(500).send("Error getting registered event from db.")
        }
        res.status(200).json(result);
    })
});

router.get('/registeredEventsDetails', (req, res) => {
    const sql = `
       SELECT e.*, COUNT(r.rEventsID) AS registration_count
FROM Events e
LEFT JOIN RegisterEvents r ON e.eventsID = r.rEventsID
GROUP BY e.eventsID;

    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error retrieving registered events", err);
            return res.status(500).send("Error getting registered events from db");
        }
        res.status(200).json(result);
    });
});

module.exports = router;