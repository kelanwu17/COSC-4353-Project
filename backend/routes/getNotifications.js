const express = require('express');
const router = express.Router();

const { sessions } = require('./logIn');

router.get('/getNotifications/:userId', (req, res) => {
    const userId = req.params.userId; 
    const userSession = sessions[userId]; // Retrieve session by userId

    if (userSession) {
        res.send([{
            message: 'You have logged in'
        }]);
    } else {
        res.status(404).send({ error: 'User not found for the given user ID' });
    }
});

module.exports = router;
