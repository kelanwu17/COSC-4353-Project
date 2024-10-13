const express = require('express');
const router = express.Router();
const { events } = require('./eventsData'); // Import shared events data

router.get('/events', (req, res) => {
    res.status(200).json(events);
});

module.exports = router;
