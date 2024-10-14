const express = require('express');
const router = express.Router();

const user = {
    email: 'user@project.com', // New phone who
    password: 'password'  // New phone who dis

};

router.post('/logIn', (req, res) => {
    const { email, password} = req.body; 

    try {
        if (!email || !password) {
            throw new Error('Email and password are required.'); 
        }

        if(email !== user.email){
            return res.status(401).json({message: 'Invalid Email'});
        }
        
        if(password !== user.password){
            return res.status(401).json({message: 'Invalid Password'});
        }

        req.session.user = {email};

        console.log('Logged In Successfully ', { email }); 


        res.status(200).json({ message: 'Logged In Successfully ', user: { email } });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;