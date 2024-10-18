const express = require('express');
const router = express.Router();
const { registeredEvents } = require('./registeredEvents');

// Route to fetch all registered events
router.get('/getRegisteredEvents', (req, res) => {
    res.status(200).json({ events: registeredEvents });
});

module.exports = router;