const express = require('express');
const router = express.Router();
const db = require("../config/dj"); 


router.delete('/deleteRegisteredEvent/:id', (req, res) => {
    const id = req.params.id; 
    const sql = `DELETE FROM RegisterEvents WHERE rEventsID = ?`

    db.query(sql, [id], (err) => {
        if (err) {
            console.error("Error deleting registered event:", err);
            return res.status(500).json({ message: "Error in DB" });
        }

        console.log(`Registered event with ID ${id} deleted successfully.`);
        res.status(200).json({ message: 'Registered event deleted successfully.' });
    });
});

module.exports = router;




