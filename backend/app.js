const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const createProfileRoute = require('./routes/createProfile'); // Profile routes
const createEventRoutes = require('./routes/createEvent'); // Event creation routes
const loginRoute = require('./routes/logIn'); // Login routes

const getProfileRoute = require('./routes/getProfile'); // Get profile routes
const updateProfileRoute = require('./routes/updateprofile'); 
const deleteProfileRoute = require('./routes/deleteprofile');

const getCsvReportRoute = require('./routes/getcsvreport');

// Event Routes
const updateEventRoutes = require('./routes/updateEvent'); // Update event routes
const getEventRoutes = require('./routes/getEvent'); // Get event routes
const deleteEventRoutes = require('./routes/deleteEvent'); // Delete event routes
const publishEventRoutes = require('./routes/createRegisteredEvents'); // Publish admin event route
const createRegisteredEvents = require('./routes/createRegisteredEvents'); // Create Registered event route
const deleteRegisteredEvent = require('./routes/deleteRegisteredEvents'); // Delete Registered event route
const getRegisteredEvents = require('./routes/getRegisteredEvents'); // Get Registered event route
const registerEvent = require('./routes/registerEvent'); 
const getNotificationsRoute = require('./routes/getNotifications'); 
const createNotificationsRoute = require('./routes/createNotification'); 
const eventMatchingRoute = require('./routes/eventMatching');
const forYouMatchingRoute = require('./routes/forYouMatching');

const adminRoute = require('./routes/admin')

const uploadImageRoute = require('./routes/uploadImage');


const app = express();
const port = 3001;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/', getCsvReportRoute);
// Profile and login routes
app.use('/', createProfileRoute); 
app.use('/', loginRoute); 
app.use('/', getProfileRoute);
app.use('/', getNotificationsRoute );
app.use('/', createNotificationsRoute );
app.use('/', updateProfileRoute)
app.use('/', deleteProfileRoute)
app.use('/admin', adminRoute);
// Event-related routes
app.use('/api', createEventRoutes);
app.use('/api', updateEventRoutes);
app.use('/api', getEventRoutes);
app.use('/api', deleteEventRoutes);
app.use('/api', publishEventRoutes);
app.use('/api', createRegisteredEvents);
app.use('/api', getRegisteredEvents);
app.use('/api', deleteRegisteredEvent);
app.use('/api', registerEvent); 
app.use('/api', uploadImageRoute);
app.use('/api', forYouMatchingRoute);



// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
module.exports = app;

