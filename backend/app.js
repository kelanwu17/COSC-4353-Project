const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const createProfileRoute = require('./routes/CreateProfile'); // Profile routes
const createEventRoutes = require('./routes/createEvent'); // Event creation routes
const { router: loginRoute } = require('./routes/logIn'); // Login routes
const getProfileRoute = require('./routes/getProfile'); // Get profile routes

// Event Routes
const updateEventRoutes = require('./routes/updateEvent'); // Update event routes
const getEventRoutes = require('./routes/getEvent'); // Get event routes
const deleteEventRoutes = require('./routes/deleteEvent'); // Delete event routes

const app = express();
const port = 3001;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Profile and login routes
app.use('/', createProfileRoute); 
app.use('/', loginRoute); 
app.use('/', getProfileRoute);

// Event-related routes
app.use('/api', createEventRoutes);
app.use('/api', updateEventRoutes);
app.use('/api', getEventRoutes);
app.use('/api', deleteEventRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
module.exports = app;

