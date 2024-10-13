const express = require('express');
const router = express.Router();
const { events } = require('./eventsData'); // Import shared events data

router.delete('/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const eventIndex = events.findIndex(event => event.id === eventId);

    if (eventIndex !== -1) {
        const deletedEvent = events.splice(eventIndex, 1);
        console.log('Deleted Event:', deletedEvent[0]);
        res.status(200).json({ message: 'Event Deleted Successfully', event: deletedEvent[0] });
    } else {
        res.status(404).json({ message: 'Event Not Found' });
    }
});

module.exports = router;
