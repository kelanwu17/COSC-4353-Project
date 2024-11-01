const express = require('express');
const router = express.Router();

// Simulated sessions and notifications (for testing purposes)
const sessions = {}; // Store user sessions in memory for this example

// Function to simulate storing user skills (replace with your implementation later)
const storeUserSkills = (skills) => {
    console.log('Storing user skills:', skills);
};

// Function to check skill match (replace with your implementation later)
const checkSkillMatch = () => {
    console.log('Checking skill match...');
};

// Profile creation route
router.post('/createprofile', (req, res) => {
    const { fullName, email, password, address, address2, city, zipcode, selectedSkills, availableTime } = req.body; 

    try {
        if (!email || !password) {
            throw new Error('Email and password are required.'); 
        }

        storeUserSkills(selectedSkills);

        console.log('Profile created:', { fullName, email, password, address, address2, city, zipcode, selectedSkills, availableTime }); 

        // Simulating creating a user session for notifications
        const sessionId = Math.random().toString(36).substring(2, 15); // Generate a random session ID
        sessions[sessionId] = { email }; // Store user session

        checkSkillMatch();
        
        res.status(201).json({ message: 'Profile created successfully', user: { email }, sessionId });
    } catch (error) {
        console.error('Error creating profile:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Route to fetch notifications for a given session ID
router.get('/getNotifications/:sessionId', (req, res) => {
    const sessionId = req.params.sessionId; 
    const userSession = sessions[sessionId]; 

    console.log(`Session ID received: ${sessionId}`);

    if (userSession) {
        // Simulate sending notifications when a valid session exists
        res.status(200).send([
            { message: 'You have logged in successfully.' },
            { message: 'New message from the system.' }
        ]);
    } else {
        // Return error if session not found
        res.status(404).send({ error: 'User not found for the given session ID.' });
    }
});

module.exports = router;
