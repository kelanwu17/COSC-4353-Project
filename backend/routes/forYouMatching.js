const express = require('express');
const router = express.Router();
const db = require('../config/dj');
const { fetchUserSkills, fetchEventSkills } = require('./eventMatching');

router.get('/forYouEvents/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
       
        const userSkills = await fetchUserSkills(userId);
        if (userSkills.length === 0) {
            return res.status(404).json({ message: 'No skills found for the user.' });
        }

        const getAllEventsSQL = 'SELECT eventsID, title, description, location, urgency, skills, startTime, endTime, imgUrl FROM Events';
        db.query(getAllEventsSQL, (err, events) => {
            if (err) {
                console.error('Error fetching events:', err);
                return res.status(500).json({ message: 'Error fetching events.' });
            }

            const matchedEvents = [];
            for (const event of events) {
                const eventSkills = event.skills.split(',').map(skill => skill.trim());
                const match = userSkills.some(skill => eventSkills.includes(skill));

                if (match) {
                    matchedEvents.push(event);
                }
            }

            if (matchedEvents.length > 0) {
                res.status(200).json(matchedEvents);
            } else {
                res.status(200).json({ message: 'No matching events found.' });
            }
        });
    } catch (error) {
        console.error('Error matching user skills with events:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
