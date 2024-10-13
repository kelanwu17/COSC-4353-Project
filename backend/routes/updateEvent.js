const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const { events } = require('./eventsData'); // Import shared events data

router.patch('/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const eventIndex = events.findIndex(event => event.id === eventId);

    if (eventIndex !== -1) {
        const { title, description, location, urgency, skills, timeRange } = req.body;

        if (title && (typeof title !== 'string' || title.length > 100)) {
            return res.status(400).json({ message: 'Invalid title: Title must be less than or equal to 100 characters.' });
        }

        const locationRegex = /^[a-zA-Z0-9\s,.-]+$/;
        if (location && !locationRegex.test(location)) {
            return res.status(400).json({ message: 'Invalid location: Location should only contain letters, numbers, spaces, dashes, and commas.' });
        }

        const currentEvent = events[eventIndex];
        const updatedEvent = {
            ...currentEvent,
            title: title || currentEvent.title,
            description: description || currentEvent.description,
            location: location || currentEvent.location,
            urgency: urgency || currentEvent.urgency,
            skills: skills || currentEvent.skills,
            timeRange: timeRange || currentEvent.timeRange,
        };

        events[eventIndex] = updatedEvent;

        console.log('Event updated:', updatedEvent);
        res.status(200).json({ message: 'Event Updated Successfully', event: updatedEvent });
    } else {
        res.status(404).json({ message: 'Event Not Found' });
    }
});

module.exports = router;
