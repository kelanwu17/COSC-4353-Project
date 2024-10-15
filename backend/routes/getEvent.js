
const express = require('express');
const router = express.Router();
const { events } = require('./eventsData'); 

// Route to get all events
router.get('/events', (req, res) => {
    res.status(200).json(events); 
});

// Route to get a specific event by ID
router.get('/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);

    if (isNaN(eventId)) {
        return res.status(400).json({ message: 'Invalid event ID' });
    }

    const event = events.find(event => event.id === eventId);

    if (!event) {
        return res.status(404).json({ message: 'Event Not Found' });
    }

    res.status(200).json(event);
});

module.exports = router;


