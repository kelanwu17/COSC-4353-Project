const express = require('express');
const router = express.Router();

const { sessions } = require('./logIn');

router.get('/getProfile/:sessionId', (req, res) => {
    const sessionId = req.params.sessionId; 
    const userSession = sessions[sessionId]; 

    console.log(sessionId);

    if (userSession) {
        res.send([{
            id: 1,
            title: 'temp',
            username: userSession.username,
        }]);
    } else {
        res.status(404).send({ error: 'User not found for the given session ID' });
    }
});


module.exports = router;
