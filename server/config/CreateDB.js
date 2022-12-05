// Imports
const config = require('./config'),
    mysql = require('mysql2')


// Create database connection
const db = mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USERNAME,
    password: config.MYSQL_PASSWORD,
})

db.connect((err) => {
    if(err)
        return console.log('Database Connection Error: ', err)

    console.log('Connected to MySQL Server')
    
    // Create Database
    const createDatabase = `CREATE DATABASE IF NOT EXISTS ${config.DB_NAME};`
    db.query(createDatabase, (err, results, fields) => {
        if (err) {
            console.log(err.message)
        }
    })

    // Create Tables
    const createUserTable = 
        ` USE ${config.DB_NAME};

        CREATE TABLE userData (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            answers VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
        );`
    db.query(createUserTable, (err, results, fields) => {
        if (err) {
            console.log(err.message)
        }
    })

    // Close Connection
    db.end((err) => {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Closed the database connection');
    })
})
