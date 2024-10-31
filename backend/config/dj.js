const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "132.145.148.136",
    user: "bladee",
    password: "ILoveBlade123!!",
    database: "main",
    port: 3306,
    ssl:{
        rejectUnauthorized: false,
        
       
    },
});

db.connect((err) => {
    if(err) {
        console.error("Error connecting to database: " + err.message);
        return;
    }
    console.log("Connected to db")
});


module.exports = db;