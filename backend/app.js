const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const createEventRoutes = require('./routes/createEvent');  // Import the routes
const updateEventRoutes = require('./routes/updateEvent');
const getEventRoutes = require('./routes/getEvent');
const deleteEventRoutes = require('./routes/deleteEvent');

app.use(express.json());
app.use(cors());

app.use('/api', createEventRoutes);  // Use the routes
app.use('/api', updateEventRoutes);
app.use('/api', getEventRoutes);
app.use('/api', deleteEventRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


