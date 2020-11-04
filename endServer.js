const express = require("express");
const path = require("path");
const app = express();
const db = require("./dbconfig.js");
const cors = require("cors");
const bodyParser = require('body-parser');


app.use(express.static(path.join(__filename, 'dbconfig')));
const port = process.env.port || 3000;

// app.use(cors());
app.use(cors());

app.get("/api", (req, res) => {
    db.query("select * from user", (error, results, fields) => {
        const userList = JSON.stringify(results);
        res.send(userList);
        res.end
    });
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/api/posts", (req, res) => {

    let user = req.body.userName;
    let password = req.body.password;
    db.query("select * from account where userName = ? and password=?", [user, password], (error, results, fields) => {
        if (error) throw error;

        if (results.length) {
            res.send("true")
        } else {
            res.send("false")
        }

        res.end()
    })
    // console.log(user);

})

app.listen(port, () => {
    console.log(`Connected to port ${port} ...`);
});

;