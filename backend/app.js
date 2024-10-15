const express = require('express');
const cors = require('cors');
const createEventRoutes = require('./routes/createEvent');
const updateEventRoutes = require('./routes/updateEvent');
const getEventRoutes = require('./routes/getEvent');
const deleteEventRoutes = require('./routes/deleteEvent');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use('/api', createEventRoutes);
app.use('/api', updateEventRoutes);
app.use('/api', getEventRoutes);
app.use('/api', deleteEventRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

