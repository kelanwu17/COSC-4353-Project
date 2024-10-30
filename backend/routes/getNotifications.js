// /routes/getNotifications.js
const express = require('express');
const router = express.Router();

const { sessions } = require('./logIn');

router.get('/getNotifications/:sessionId', (req, res) => {
    const sessionId = req.params.sessionId; 
    const userSession = sessions[sessionId]; 

    console.log(sessionId);

    if (userSession) {
        res.send([{
            message: 'You have logged in'
        }]);
    } else {
        res.status(404).send({ error: 'User not found for the given session ID' });
    }
});

module.exports = router;