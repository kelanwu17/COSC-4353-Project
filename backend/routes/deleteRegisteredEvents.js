const express = require('express');
const router = express.Router();
const db = require("../config/dj"); 

router.delete('/deleteRegisteredEvent/:userID', (req, res) => {
    const userID = req.params.userID; 
    const { eventId } = req.body; // Make sure the eventId is passed in the request body

    if (!eventId) {
        return res.status(400).json({ message: "Event ID is required." });
    }

    // Use the correct column name in the query
    const sql = `DELETE FROM RegisterEvents WHERE userID = ? AND eventsID = ?`;

    db.query(sql, [userID, eventId], (err, results) => {
        if (err) {
            console.error("Error deleting registered event:", err);
            return res.status(500).json({ message: "Error in DB" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "No registration found for the given user and event." });
        }

        console.log(`Registered event for userID ${userID} and eventsID ${eventId} deleted successfully.`);
        res.status(200).json({ message: 'Registered event deleted successfully.' });
    });
});

module.exports = router;





