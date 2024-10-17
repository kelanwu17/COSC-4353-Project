const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const { events, incrementEventsId } = require('./eventsData');


router.post('/createevent', (req, res) => {
    const {title, description, location, urgency, skills, timeRange} = req.body; 

    if (!title || typeof title !== 'string' || title.length > 100) {
        return res.status(400).json({ message: 'Invalid title: Title is required and must be less than or equal to 100 characters.' });
    }

    if (!description || typeof description !== 'string') {
        return res.status(400).json({ message: 'Invalid description: Description is required.' });
    }

    if (!Array.isArray(skills) || skills.length === 0) {
        return res.status(400).json({ message: 'Invalid skills: At least one skill is required.' });
    }

    if (!timeRange || timeRange.length !== 2 || !dayjs(timeRange[0]).isValid() || !dayjs(timeRange[1]).isValid()) {
        return res.status(400).json({ message: 'Invalid time range: A valid start and end date are required.' });
    }

    const locationRegex = /^[a-zA-Z0-9\s,.-]+$/;
    if (!location || typeof location !== 'string' || !locationRegex.test(location)) {
        return res.status(400).json({ message: 'Invalid location: Location is required and should only contain letters, numbers, spaces, dashes, and commas.' });
    }

    try {

            let formattedTimeRange;
            if (timeRange && timeRange.length === 2 && dayjs(timeRange[0]).isValid() && dayjs(timeRange[1]).isValid()) {
                const formattedStartDate = dayjs(timeRange[0]).format('dddd, MM/DD/YYYY');
                const formattedEndDate = dayjs(timeRange[1]).format('dddd, MM/DD/YYYY');
                const startTime = dayjs(timeRange[0]).format('hh:mm A');
                const endTime = dayjs(timeRange[1]).format('hh:mm A');
                formattedTimeRange = `From ${formattedStartDate} starting at ${startTime}. To ${formattedEndDate} ending at ${endTime}`;
            } else {
                formattedTimeRange = 'No time range selected';
            }
            const event = { id: incrementEventsId(), title, description, location, urgency, skills, timeRange: formattedTimeRange };
            events.push(event);
        

        console.log('Profile created:', { id: event.id, title, description, location, urgency, skills, timeRange: formattedTimeRange }); 


        res.status(201).json({ message: 'Title Created Successfully', event });
    } catch (error) {
        console.error('Error creating profile:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
    
});


module.exports = router;
