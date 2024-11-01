const express = require('express');
const router = express.Router();
const { events } = require('./eventsData'); 
const db = require ('../config/dj');

// Route to get all events
router.get('/events', (req, res) => {
    const sql = "SELECT * FROM Events";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error getting events", err);
            return res.status(500).send("Error getting events from db.")
        }
        res.status(200).json(result);
    })
});

// Route to get a specific event by ID
router.get('/events/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM Events WHERE eventsId = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error getting events", err);
            return res.status(500).send("Error getting events from db.")
        }
        res.status(200).json(result);
    })
});

module.exports = router;


