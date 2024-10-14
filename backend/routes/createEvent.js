const express = require('express');
const router = express.Router();

router.post('/createevent', (req, res) => {
    const {title  } = req.body; 

    try {
        
        console.log('Profile created:', { title }); 


        res.status(201).json({ message: 'Title Created Successfully', user: { title } });
    } catch (error) {
        console.error('Error creating profile:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;