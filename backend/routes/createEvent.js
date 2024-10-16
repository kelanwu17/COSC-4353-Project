const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const { events, incrementEventsId } = require('./eventsData');
const { storeEventSkills, checkSkillMatch } = require('./eventMatching');

router.post('/createevent', (req, res) => {
    const { title, description, location, urgency, skills, timeRange } = req.body;

    try {
    
        storeEventSkills(skills);
    } catch (error) {
        console.error('Error storing event skills:', error.message);
        return res.status(500).json({ message: 'Failed to store event skills.' });
    }

    // Validation for length
    if (!title || typeof title !== 'string' || title.length > 100) {
        return res.status(400).json({
            message: 'Invalid title: Title is required and must be less than or equal to 100 characters.'
        });
    }

    // Validation for Description requirement
    if (!description || typeof description !== 'string') {
        return res.status(400).json({
            message: 'Description is required.'
        });
    }

    // Validation for Skill
    if (!Array.isArray(skills) || skills.length === 0) {
        return res.status(400).json({
            message: 'At least one skill is required.'
        });
    }

    // Validation fro Time Range
    if (!timeRange || timeRange.length !== 2 || 
        !dayjs(timeRange[0]).isValid() || !dayjs(timeRange[1]).isValid()) {
        return res.status(400).json({
            message: 'A valid start and end date are required.'
        });
    }

    // Validation for Location
    const locationRegex = /^[a-zA-Z0-9\s,.-]+$/;
    if (!location || typeof location !== 'string' || !locationRegex.test(location)) {
        return res.status(400).json({
            message: 'Location required should only contain letters, numbers, spaces, dashes, and commas.'
        });
    }

    try {
        
        const formattedTimeRange = `From ${dayjs(timeRange[0]).format('dddd, MM/DD/YYYY')} starting at ${dayjs(timeRange[0]).format('hh:mm A')}. To ${dayjs(timeRange[1]).format('dddd, MM/DD/YYYY')} ending at ${dayjs(timeRange[1]).format('hh:mm A')}`;

        const isMatch = checkSkillMatch(skills); 

        const event = {
            id: incrementEventsId(),
            title,
            description,
            location,
            urgency,
            skills,
            timeRange: formattedTimeRange
        };

        events.push(event);

        console.log('Event created:', event);

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

