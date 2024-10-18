const express = require('express');
const router = express.Router();
const { registeredEvents } = require('./registeredEvents');

// Route to register an event
router.post('/registerEvent', (req, res) => {
    const newEvent = req.body; 

    
    if (registeredEvents.find(event => event.title === newEvent.title)) {
        return res.status(400).json({ message: 'Event is already registered.' });
    }

    registeredEvents.push(newEvent);
    console.log(`User registered to event: ${newEvent.title}`);
    
    res.status(201).json({ message: 'Event registered successfully.', event: newEvent });
});

module.exports = router;
