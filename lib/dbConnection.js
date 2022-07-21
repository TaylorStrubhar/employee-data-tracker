const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'JockoWork9900!!',
    database: 'employee_dtdb'
});

connection.connect(error => {
    if (error) throw error;

});

module.exports = connection;