const express = require('express');
const router = express.Router();

let events = [];

router.post();

router.post('/', (req, res) => {
    const { description, image, location, skills, titles, urgency} = req.body;
    
    if (!description| !image || !location || !skills || !titles || !urgency || skills.length){
        return res.status(400).json({message: 'Please fill out every field.'});
    }

    const newEvent = {
    id: events.length + 1,
    description,
    image,
    location,
    skills,
    titles,
    urgency,
    };

    events.push(newEvent);

    return res.status(201).json({ message:'Even created succcessfully', event: newEvent});
});

module.exports = router;