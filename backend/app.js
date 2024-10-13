const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

const createEventRoutes = require('./routes/createEvent');

// Middleware to parse JSON request bodies
app.use(express.json()); // Middleware to handle JSON requests
app.use(cors()); // Enable CORS

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/', createEventRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
