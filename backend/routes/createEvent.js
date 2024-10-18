const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const { events, incrementEventsId } = require('./eventsData');
const { storeEventSkills, checkSkillMatch } = require('./eventMatching');// Import skill match function

router.post('/createevent', (req, res) => {
    const { title, description, location, urgency, skills, timeRange } = req.body;

    try {
        // Store event-selected skills
        storeEventSkills(skills);
    } catch (error) {
        console.error('Error storing event skills:', error.message);
        return res.status(500).json({ message: 'Failed to store event skills.' });
    }

    // Validation: Title
    if (!title || typeof title !== 'string' || title.length > 100) {
        return res.status(400).json({
            message: 'Invalid title: Title is required and must be less than or equal to 100 characters.'
        });
    }

    // Validation: Description
    if (!description || typeof description !== 'string') {
        return res.status(400).json({
            message: 'Invalid description: Description is required.'
        });
    }

    // Validation: Skills
    if (!Array.isArray(skills) || skills.length === 0) {
        return res.status(400).json({
            message: 'Invalid skills: At least one skill is required.'
        });
    }

    // Validation: Time Range
    if (!timeRange || timeRange.length !== 2 || 
        !dayjs(timeRange[0]).isValid() || !dayjs(timeRange[1]).isValid()) {
        return res.status(400).json({
            message: 'Invalid time range: A valid start and end date are required.'
        });
    }

    // Validation: Location
    const locationRegex = /^[a-zA-Z0-9\s,.-]+$/;
    if (!location || typeof location !== 'string' || !locationRegex.test(location)) {
        return res.status(400).json({
            message: 'Invalid location: Location should only contain letters, numbers, spaces, dashes, and commas.'
        });
    }

    try {
        // Format the time range
        const formattedTimeRange = `From ${dayjs(timeRange[0]).format('dddd, MM/DD/YYYY')} starting at ${dayjs(timeRange[0]).format('hh:mm A')}. To ${dayjs(timeRange[1]).format('dddd, MM/DD/YYYY')} ending at ${dayjs(timeRange[1]).format('hh:mm A')}`;

        // Check for skill match using the imported function
        const isMatch = checkSkillMatch(skills); // Logs 'Match found!' if there is a match

        // Create the new event object
        const event = {
            id: incrementEventsId(),
            title,
            description,
            location,
            urgency,
            skills,
            timeRange: formattedTimeRange
        };

        // Store the new event
        events.push(event);

        console.log('Event created:', event);

        // Send success response with match message
        res.status(201).json({
            message: isMatch ? 'Match found!' : 'No match found.',
            event
        });

        console.log(isMatch ? 'Match found between user and event!\n' : 'No match found between event and profile skills.\n');


    } catch (error) {
        console.error('Error creating event:', error.message);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

module.exports = router;

