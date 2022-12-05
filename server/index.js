// Imports
const express = require("express"),
    mysql = require("mysql2"),
    cors = require("cors"),
    userRouter = require('./routes/users')


const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "dateMatch",
});


app.use('/', userRouter)


app.listen(8888, (error) => {
    if(!error)
        console.log("Server is up and listening on port 8888...")
    else
        console.log("Error occured, server couldn't start", error)
})