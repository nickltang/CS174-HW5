const express = require('express'),
    mysql = require("mysql")

const router = express.Router()

// Create connection
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "dateMatch",
});


// POST /login
router.post('/login', (req, res) => {
    console.log('POST /login', req.body)

    const username = req.body.username;
    const password = req.body.password;

    // db.query(
    //     "INSERT INTO users (username, password) VALUES (?, ?)",
    //     [username, password],
    //     (err, result) => {
    //         console.log(err);
    //     }
    // );
})

// POST /register
router.post('/createAccount', (req, res) => {
    console.log('POST /createAccount', req.body)

    const username = req.body.username
    const password = req.body.password
    const answers = req.body.answers

    // db.query(
    //     "INSERT INTO users (username, password, answers) VALUES (?, ?, ?)",
    //     [username, password, answers],
    //     (err, result) => {
    //         console.log(err);
    //     }
    // );
})

// POST /getSuggestion
router.post('/getSuggestion', (req, res) => {
    console.log('POST /getSuggestion', req.body)

    const username = req.body.username
    const password = req.body.password
    const answers = req.body.answers

    // db.query(
    //     "INSERT INTO users (username, password, answers) VALUES (?, ?, ?)",
    //     [username, password, answers],
    //     (err, result) => {
    //         console.log(err);
    //     }
    // );
})

// POST /suggestMore
router.post('/suggestMore', (req, res) => {
    console.log('POST /suggestMore', req.body)

    const username = req.body.username

    // db.query(
    //     "INSERT INTO users (username, password, answers) VALUES (?, ?, ?)",
    //     [username, password, answers],
    //     (err, result) => {
    //         console.log(err);
    //     }
    // );
})

// POST /suggestLess
router.post('/suggestLess', (req, res) => {
    console.log('POST /suggestLess', req.body)

    const username = req.body.username
    const password = req.body.password
    const answers = req.body.answers

    // db.query(
    //     "INSERT INTO users (username, password, answers) VALUES (?, ?, ?)",
    //     [username, password, answers],
    //     (err, result) => {
    //         console.log(err);
    //     }
    // );
})

// POST /resetSuggestions
router.post('/resetSuggestions', (req, res) => {
    console.log('POST /resetSuggestions', req.body)

    const username = req.body.username
    const password = req.body.password
    const answers = req.body.answers

    // db.query(
    //     "INSERT INTO users (username, password, answers) VALUES (?, ?, ?)",
    //     [username, password, answers],
    //     (err, result) => {
    //         console.log(err);
    //     }
    // );
})


module.exports = router


