const express = require('express');
const router = express.Router();
const { events } = require('./eventsData'); 

// Route to create/publish an event
router.patch('/createRegisteredEvents/:id', (req, res) => {
    const { id } = req.params;
    const event = events.find((e) => e.id === parseInt(id)); 
    if (!event) {
        return res.status(404).json({ message: 'Event not found.' });
    }

    event.published = true;

    console.log(`Event with id:${id} successfully published.`);
    res.status(200).json({ message: 'Event published successfully.', event });
});

module.exports = router;
