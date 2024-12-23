const express = require('express');
const router = express.Router();
const db = require("../config/dj");

router.get('/getProfile/:userID', (req, res) => {
    const userID = req.params.userID;

    const sql = "SELECT fullName, email, address, address2, city, zipcode, selectedSkills, state FROM User WHERE userID = ?";

    db.query(sql, [userID], (err, results) => {
        if (err) {
            console.error('Database query error:', err.message);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userProfile = results[0];
        res.status(200).json({
            id: userID,
            fullName: userProfile.fullName,
            email: userProfile.email,
            address: userProfile.address,
            address2: userProfile.address2,
            city: userProfile.city,
            zipcode: userProfile.zipcode,
            selectedSkills: userProfile.selectedSkills,
            state: userProfile.state
        });
    });
});
router.get('/getAllProfiles', (req, res) => {
    const sql = "SELECT User.userID, fullName, email, Events.title, Events.eventCreated, Events.startTime, Events.endTime FROM User, RegisterEvents, Events WHERE RegisterEvents.userId = User.userID AND RegisterEvents.eventsID = Events.eventsID";
    
    // Assuming you have a database connection, you might execute it like so:
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});
router.get('/getAllUserProfiles', (req, res) => {
    const sql = "SELECT * from User";
    
    // Assuming you have a database connection, you might execute it like so:
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
