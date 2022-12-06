const express = require('express'),
    mysql = require("mysql2")

const router = express.Router()

// Create connection
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "homework5",
});


// POST /login
router.post('/login', (req, res) => {
    console.log('POST /login', req.body)

    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if(err) {
                res.status(400).send("Error querying user's info: ", err)
            } else {
                console.log('userinfo: ', result)

                if(result === {} || result.length === 0) {
                    res.status(200).send({message: 'User credentials not found.', userInfo: -1})
                } else {
                    res.status(200).send({ message: 'Successfully signed in.', userInfo: result[0]})
                }
            }
        }
    )
})

// POST /createAccount
router.post('/createAccount', (req, res) => {
    console.log('POST /createAccount', req.body)

    const username = req.body.username
    const name = req.body.name
    const password = req.body.password
    const answers = JSON.parse(req.body.answers)

    // Answers should come in as a string?
    // Convert to score according to requirements
    const score = (answers.reduce((a, b) => a + b, 0)) / 10
    console.log('score: ', score)

    db.query(
        "INSERT INTO users (username, name, password, answers, score) VALUES (?, ?, ?, ?, ?)",
        [username, name, password, JSON.stringify(answers), score],
        (err, result) => {
            if(err) {
                console.log(err)
                res.status(400).send({message: `Error adding account to database: ${err}`})
            } else {
                const userInfo = {...req.body, score: score}
                console.log('Successfully added ', userInfo)

                res.status(200).send({ message: 'Successfully added user.', userInfo: userInfo})
            }
            res.end()
        }
    )
})

// POST /getUserInfo
router.post('/getUserInfo', (req, res) => {
    console.log('POST /getUserInfo', req.body)

    const id = parseInt(req.body.id)
    
    db.query(
        `SELECT * FROM users WHERE id=${id}`,
        (err, result) => {
            if(err) {
                console.log(err);
                res.status(400).send('Error querying user info from database: ', err)
            } else {
                console.log(result)
                res.status(200).send({ message: 'Successfully added user.', userInfo: result})
            }
        }
    );
})

// POST /getSuggestion
router.post('/getSuggestion', (req, res) => {
    console.log('POST /getSuggestion', req.body)

    const id = parseInt(req.body.id)
    db.promise().query(`SELECT score FROM users WHERE id=${id}`).then(([rows, fields]) => {
        const score = rows[0].score

        console.log('score ', score)
        // Query for closest number
        db.promise().query(`SELECT id FROM users ORDER BY ABS(score - ${score}) ASC`).then(([rows,fields]) => {
            console.log(rows)
        }).catch(console.log)
    }).catch(console.log)

    
    const dummySuggestion = {
        name: "Bob Jones",
        username: "BobJonesMacDaddy@hotmail.com",
        answers: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }

    res.status(200).send({userInfo: dummySuggestion})
})

// POST /suggestMore
router.post('/suggestMore', (req, res) => {
    console.log('POST /suggestMore', req.body)

    const user_id = req.body.user_id
    const suggested_id = req.body.suggested_id

    const user_score = db.promise().query(`SELECT score FROM users WHERE id=${user_id}`).then(([rows, fields]) => rows[0].score)
    const suggested_score = db.promise().query(`SELECT score FROM users WHERE id=${suggested_id}`).then(([rows, fields]) => rows[0].score)

    Promise.all([user_score, suggested_score]).then((values) => { 
        if(user_score > suggested_score)
            return Math.abs(values[0] - values[1] * 0.1)
        return Math.abs(values[0] + values[1] * 0.1)
    }).then((newScore) => {
        db.query(`UPDATE users SET score = ${newScore} WHERE id = ${user_id}`)
        res.status(200).send({message: `User ${user_id}'s score changed to ${newScore}`})
    })
})

// POST /suggestLess
router.post('/suggestLess', (req, res) => {
    console.log('POST /suggestLess', req.body)

    const user_id = req.body.user_id
    const suggested_id = req.body.suggested_id

    const user_score = db.promise().query(`SELECT score FROM users WHERE id=${user_id}`).then(([rows, fields]) => rows[0].score)
    const suggested_score = db.promise().query(`SELECT score FROM users WHERE id=${suggested_id}`).then(([rows, fields]) => rows[0].score)

    Promise.all([user_score, suggested_score]).then((values) => { 
        if(user_score > suggested_score)
            return Math.abs(values[0] + values[1] * 0.1)
        return Math.abs(values[0] - values[1] * 0.1)
    }).then((newScore) => {
        db.query(`UPDATE users SET score = ${newScore} WHERE id = ${user_id}`)
        res.status(200).send({message: `User ${user_id}'s score changed to ${newScore}`})
    })
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


