const express = require('express')
const app = express()
const port = 3001

const login = require('./routes/logIn');

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.use('/', login);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
