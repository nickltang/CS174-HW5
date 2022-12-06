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

    // Drop suggestionstable if exists to start with clean database
    db.query(`DROP TABLE IF EXISTS suggestions;`, (err, results, fields) => {
        if (err) {
            console.log(err.message)
        }
    })
    // Drop users table if exists to start with clean database
    db.query(`DROP TABLE IF EXISTS users;`, (err, results, fields) => {
        if (err) {
            console.log(err.message)
        }
    })


    // Create users table
    const createUsersTable = `
        CREATE TABLE users (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            username VARCHAR(64) UNIQUE NOT NULL,
            name VARCHAR(64) NOT NULL,
            password VARCHAR(64) NOT NULL,
            answers VARCHAR(512),
            score FLOAT UNSIGNED,
            PRIMARY KEY (id)
        );`
    db.query(createUsersTable, (err, results, fields) => {
        if (err) {
            console.log(err.message)
        }
    })

    // Create suggestions table
    const createSuggestionsTable = `
        CREATE TABLE suggestions (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id INT UNSIGNED NOT NULL,
            suggested_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (suggested_id) REFERENCES users(id),
            PRIMARY KEY (id)
        );`
    db.query(createSuggestionsTable, (err, results, fields) => {
        if (err) {
            console.log(err.message)
        }
    })


    const insertUsers = `
    INSERT INTO users (username, name, password, answers, score) VALUES 
        ('john@gmail.com', 'john', 'john', "[0, 0, 0, 0, 0, 1, 1, 1, 1, 1]", 0.5),
        ('bob@gmail.com', 'bob', 'bob', "[0, 0, 0, 0, 0, 1, 1, 1, 1, 0]", 0.4),
        ('jane@gmail.com', 'jane', 'jane', "[0, 0, 0, 0, 0, 1, 1, 1, 0, 0]", 0.3),
        ('mary@gmail.com', 'mary', 'mary', "[0, 0, 0, 0, 0, 1, 2, 1, 0, 0]", 0.2),
        ('joe@gmail.com', 'joe', 'joe', "[0, 0, 0, 0, 1, 1, 1, 1, 1, 1]", 0.6);
    `
    db.query(insertUsers, (err, results, fields) => {
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
