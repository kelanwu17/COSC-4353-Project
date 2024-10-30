const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '132.145.148.136',
    port: 3306,
    user: 'bladee',
    password: 'ILoveBlade123!!',
    database: 'main'

});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1); 
    }
    console.log('Connected to the main database');
    connection.end(); 
});






