const express = require('express');
const router = express.Router();
const db = require("../config/dj"); 


router.post('/registerEvent', (req, res) => {
    const { userID, eventsID } = req.body;

    const checkIfRegisteredSQL = `
        SELECT * FROM RegisterEvents 
        WHERE userID = ? AND eventsID = ?`;

    db.query(checkIfRegisteredSQL, [userID, eventsID], (checkErr, checkResult) => {
        if (checkErr) {
            console.error("Error checking registration:", checkErr);
            return res.status(500).json({ message: "Database error while checking registration." });
        }
        if (checkResult.length > 0) {
            return res.status(400).json({ message: "User is already registered for this event." });
        }
        const insertRegistrationSQL = `
            INSERT INTO RegisterEvents (userID, eventsID) 
            VALUES (?, ?)`;

        db.query(insertRegistrationSQL, [userID, eventsID], (insertErr, insertResult) => {
            if (insertErr) {
                console.error("Error registering for event:", insertErr);
                return res.status(500).json({ message: "Database error while registering for the event." });
            }

            res.status(201).json({
                message: "Event registered successfully.",
                registrationID: insertResult.insertId
            });
        });
    });
});
                


// const express = require('express');
// const router = express.Router();
// const { events } = require('./eventsData'); 

// // Route to create/publish an event
// router.patch('/createRegisteredEvents/:id', (req, res) => {
//     const { id } = req.params;
//     const event = events.find((e) => e.id === parseInt(id)); 
//     if (!event) {
//         return res.status(404).json({ message: 'Event not found.' });
//     }

//     event.published = true;

//     console.log(`Event with id:${id} successfully published.`);
//     res.status(200).json({ message: 'Event published successfully.', event });
// });

module.exports = router;
