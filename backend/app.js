const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const createProfileRoute = require('./routes/CreateProfile');
const createEventRoutes = require('./routes/createEvent');
const { router: loginRoute } = require('./routes/logIn'); 
const getProfileRoute = require('./routes/getProfile'); 
const cookieParser = require('cookie-parser');


app.use(express.json()); 
app.use(cors()); 
app.use(cookieParser()); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/', createProfileRoute);
app.use('/', createEventRoutes);
app.use('/', loginRoute); 
app.use('/', getProfileRoute); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
