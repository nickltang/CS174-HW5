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
    db.query(`CREATE DATABASE IF NOT EXISTS ${config.DB_NAME};`, (err, results, fields) => {
        if (err) {
            console.log(err.message)
        }
    })

    // Use Database
    db.query(`USE ${config.DB_NAME};`, (err, results, fields) => {
        if (err) {
            console.log(err.message)
        }
    })

    // Drop table if exists to start with clean database
    db.query(`DROP TABLE IF EXISTS users;`, (err, results, fields) => {
        if (err) {
            console.log(err.message)
        }
    })


    // Create users table
    const createUsersTable = `
        CREATE TABLE users (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            username VARCHAR(64) NOT NULL,
            name VARCHAR(64) NOT NULL,
            password VARCHAR(64) NOT NULL,
            answers VARCHAR(512),
            score int UNSIGNED,
            PRIMARY KEY (id)
        );`
    db.query(createUsersTable, (err, results, fields) => {
        if (err) {
            console.log(err.message)
        } else {

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
