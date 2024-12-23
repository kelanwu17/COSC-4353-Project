const express = require('express');
const router = express.Router();
const { events } = require('./eventsData'); 
const db = require('../config/dj');

router.delete('/events/:id', (req, res) => {
    const id = req.params.id;

    const deleteRegistrationsSQL = "DELETE FROM RegisterEvents WHERE eventsID = ?";
    db.query(deleteRegistrationsSQL, [id], (err) => {
        if (err) {
            console.error("Error deleting related registrations:", err);
            return res.status(500).send("Error deleting related registrations");
        }


    const sql = "DELETE FROM Events WHERE eventsId = ?"
    db.query(sql, [id], (err) => {
        if (err) {
            console.error("Error deleting event", err);
            res.status(500).send("Error")
        }
        res.status(200).send("Deleted")
    })
    });
});

module.exports = router;

