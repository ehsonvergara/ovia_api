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
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
    db.query("select * from user", (error, results, fields) => {
        const userList = JSON.stringify(results);
        res.send(userList);
        res.end
    });
})


app.post("/api/createaccont", (req, res) => {

    userName = req.body.userName,
        password = req.body.password,
        firstName = req.body.firstName,
        lastName = req.body.lastName,

        db.query("insert into useraccount set ?",
            {
                userName: userName,
                password: password,
                firstName: firstName,
                lastName: lastName
            },
            (error, results, field) => {
                if (error) throw error;

            })

    res.end()
})



app.post("/api/posts", (req, res) => {

    let user = req.body.userName;
    let password = req.body.password;
    db.query("select * from useraccount where userName ='admin' and password='admin'", (error, results, fields) => {
        if (error) throw error;
        const result = JSON.stringify(results);
        res.send(result);

        // if (results.length) {
        //     res.send(result)
        // } else {
        //     res.send("false")
        // }

        res.end()
    })
    // console.log(user);

})

app.listen(port, () => {
    console.log(`Connected to port ${port} ...`);
});

;