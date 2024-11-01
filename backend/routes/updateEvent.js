const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const { events } = require("./eventsData");

router.put("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const { title, description, location, urgency, skills, startTime, endTime } =
    req.body;
  const sql = `UPDATE Events 
        SET title =?, description =?, location =?, urgency =?, skills =?, startTime =?, endTime = ? 
    WHERE eventsId = ?`;
db.query(sql, [title, description, location, urgency, skills, startTime, endTime, eventId], (err) => {
    if (err) return res.status(500).send("DB error");
    res.status(200).send("Successfully updated")
})
});

module.exports = router;
