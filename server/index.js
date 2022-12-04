const express = require("express");
const app = express();
app.use(express.json());
app.listen(8888, () => {
    console.log("Running server");
})