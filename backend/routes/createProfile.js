const express = require('express');
const router = express.Router();
const { storeUserSkills, checkSkillMatch } = require('./eventMatching'); 

router.post('/createprofile', (req, res) => {
    const { fullName, email, password, address, address2, city, zipcode, selectedSkills, availableTime } = req.body; 

    try {
        if (!email || !password) {
            throw new Error('Email and password are required.'); 
        }

         storeUserSkills(selectedSkills);

        console.log('Profile created:', { fullName, email, password, address, address2, city, zipcode, selectedSkills, availableTime }); 

        checkSkillMatch();
        
        res.status(201).json({ message: 'Profile created successfully', user: { email } });
    } catch (error) {
        console.error('Error creating profile:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;