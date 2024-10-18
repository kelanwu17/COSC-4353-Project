const express = require('express');
const router = express.Router();
const { registeredEvents } = require('./registeredEvents'); 

// Route to delete a registered event 
router.delete('/deleteRegisteredEvent', (req, res) => {
    const { title } = req.body; 

    const eventIndex = registeredEvents.findIndex((e) => e.title === title);

    if (eventIndex === -1) {
        return res.status(404).json({ message: 'Registered event not found.' });
    }

    registeredEvents.splice(eventIndex, 1); 

    console.log(`User removed registered event "${title}" successfully.`);
    res.status(200).json({ message: 'Registered event deleted successfully.' });
});

module.exports = router;



