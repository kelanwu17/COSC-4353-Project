const express = require('express');
const router = express.Router();
const db = require("../config/dj");


router.get('/getImage/:id', (req, res) => {
    const eventId = req.params.id;
    const sql = "SELECT image FROM Events WHERE eventId = ?";

    db.query(sql, [eventId], (err, result) => {
        if (err) {
            console.error('Error retrieving image from database:', err);
            return res.status(500).json({ message: 'Error retrieving image' });
        }

        if (result.length > 0) {
            const imageBuffer = result[0].image;
            const base64Image = Buffer.from(imageBuffer).toString('base64');
            res.status(200).json({ image: `data:image/png;base64,${base64Image}` });
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    });
});

module.exports = router;
