const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');

const events =[];

let eventsId = 1;


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
        
        const event = { id: eventsId++, title, description, location, urgency, skills, timeRange: formattedTimeRange};
        events.push(event);

        console.log('Profile created:', { id: event.id, title, description, location, urgency, skills, timeRange: formattedTimeRange }); 


        res.status(201).json({ message: 'Title Created Successfully', user: { title, description, location, urgency, skills, timeRange: formattedTimeRange, event} });
    } catch (error) {
        console.error('Error creating profile:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
    
});

router.patch('/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const eventIndex = events.findIndex(event => event.id === eventId);

    if (eventIndex !== -1) {

        const { title, description, location, urgency, skills, timeRange } = req.body;

        if (title && (typeof title !== 'string' || title.length > 100)) {
            return res.status(400).json({ message: 'Invalid title: Title must be less than or equal to 100 characters.' });
        }

        
        const locationRegex = /^[a-zA-Z0-9\s,.-]+$/;
        if (location && (!locationRegex.test(location))) {
            return res.status(400).json({ message: 'Invalid location: Location should only contain letters, numbers, spaces, dashes, and commas.' });
        }
     
        const currentEvent = events[eventIndex];  

    
        const updatedEvent = {
            ...currentEvent,  
            title: req.body.title || currentEvent.title, 
            description: req.body.description || currentEvent.description,  
            location: req.body.location || currentEvent.location,  
            urgency: req.body.urgency || currentEvent.urgency,
            skills: req.body.skills || currentEvent.skills,
            timeRange: req.body.timeRange || currentEvent.timeRange  
        };

        events[eventIndex] = updatedEvent;
        
        let formattedTimeRange = "No Time Range Provided";
        if (updatedEvent.timeRange && updatedEvent.timeRange.length === 2) {
            const formattedStartDate = dayjs(updatedEvent.timeRange[0]).format('MM-DD-YYYY');
            const formattedEndDate = dayjs(updatedEvent.timeRange[1]).format('MM-DD-YYYY');
            const startTime = dayjs(updatedEvent.timeRange[0]).format('hh:mm A');
            const endTime = dayjs(updatedEvent.timeRange[1]).format('hh:mm A');
            formattedTimeRange = `From ${formattedStartDate} starting at ${startTime}. To ${formattedEndDate} ending at ${endTime}`;
        }

        console.log('Event updated:', { id: updatedEvent.id, title: updatedEvent.title });
        console.log('Updated event:', { 
            id: updatedEvent.id, 
            title: updatedEvent.title, 
            description: updatedEvent.description, 
            location: updatedEvent.location, 
            urgency: updatedEvent.urgency, 
            skills: updatedEvent.skills, 
            timeRange: formattedTimeRange 
        }); 
        res.status(200).json({ message: 'Event Updated Successfully', event: updatedEvent });
    } else {
        res.status(404).json({ message: 'Event Not Found' });
    }
});

router.get ('/events', (req, res) => { 
   
    res.status(200).json(events);
});

router.delete('/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const eventIndex = events.findIndex(event => event.id === eventId);

    if (eventIndex !== -1) {
        const deletedEvent = events[eventIndex];
        events.splice(eventIndex, 1);  
        console.log('Deleted Event:', {id: deletedEvent.id, title: deletedEvent.title},'succesfully');
        res.status(200).json({ message: 'Event Deleted Successfully' });
    } else {
        res.status(404).json({ message: 'Event Not Found' });
    }
});

module.exports = router;