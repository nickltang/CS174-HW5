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

        db.promise().query(`SELECT id FROM users ORDER BY ABS(score - ${score}) ASC`).then(([rows,fields]) => {
            const closestIDs = []
            rows.map((obj) => {
                closestIDs.push(obj.id)
            })

            return closestIDs
        }).then((closestIDs) => {
            db.promise().query(`SELECT suggested_id FROM suggestions WHERE user_id = ${id}`).then(([rows, fields]) => {
                const usedIDs = []
                rows.map((obj) => {
                    usedIDs.push(obj.suggested_id)
                })

                console.log('used IDs', usedIDs)
                console.log('closest IDs before', closestIDs)

                closestIDs = closestIDs.filter(thisID => !usedIDs.includes(thisID))

                console.log('filtered IDs after', closestIDs)

                
                // First closest score to our user in DB is our user, so take next closest ID
                const closest = closestIDs[1]

                if(closest === undefined || closest === null) {
                    console.log("Out of suggestions!")
                    res.status(200).send({userInfo: -1})
                } else {
                    db.promise().query(`INSERT suggestions (user_id, suggested_id) VALUES (${id}, ${closest})`)
                    .then(() => db.promise().query(`SELECT * FROM users WHERE id = ${closest}`)).then(([rows, fields]) => {
                        console.log(rows)
                        res.status(200).send({userInfo: rows[0]})
                    })
                }

                
            })
        })
    })
})


// POST /suggestMore
router.post('/suggestMore', (req, res) => {
    console.log('POST /suggestMore', req.body)

    const user_id = JSON.parse(req.body.user_id)
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

    const user_id = req.body.user_id

    db.query(
        `DELETE FROM suggestions WHERE user_id = ${user_id}`,
        (err, result) => {
            console.log(err);
        }
    );

    res.status(200).send({message: `User ${user_id}'s suggestions history was cleared.`})
})


module.exports = router


