const express = require("express");
const path = require("path");
const app = express();
const db = require("./dbconfig.js");
const cors = require("cors");
const bodyParser = require('body-parser');
// const favicon = require('serve-favicon');



// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

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
        role = "client",

        db.query("insert into useraccount set ?",
            {
                userName: userName,
                password: password,
                firstName: firstName,
                lastName: lastName,
                role: role
            },
            (error, results, field) => {
                if (error) throw error;

            })

    res.end()
})

app.get("/api/getuserlist", (req, res) => {
    db.query("Select * from useraccount", (error, results, field) => {
        if (error) throw error;
        const result = JSON.stringify(results);
        res.send(result);
        res.end
    })

})

app.post("/api/login", (req, res) => {

    let userName = req.body.userName;
    let password = req.body.password;
    db.query("select * from useraccount where userName = 'e@e.com' and password= 'q'", (error, results, fields) => {
        // db.query("select * from useraccount where userName = ? and password= ?", [userName, password], (error, results, fields) => {
        if (error) throw error;
        const result = JSON.stringify(); results
        res.send(result);

        // if (results.length) {
        //     res.send("tama")
        // } else {
        //     res.send("false")
        // }

        res.end()
    })
    // console.log(user);

})

//SALES 

app.post("/api/createsaleslead", (req, res) => {

    firstName = req.body.firstName,
        lastName = req.body.lastName,
        email = req.body.email,
        address = req.body.address,
        gender = req.body.gender,
        unit1 = req.body.unit1,
        unit2 = req.body.unit2,


        db.query("insert into saleslead set ?",
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
                gender: gender,
                unit1: unit1,
                unit2: unit2
            },
            (error, results, field) => {
                if (error) throw error;

            })

    res.end()
})
app.get("/api/getsalesleads", (req, res) => {
    db.query("Select * from saleslead", (error, results, field) => {
        if (error) throw error;
        const result = JSON.stringify(results);
        res.send(result);
        res.end
    })

})
app.listen(port, () => {
    console.log(`Connected to port ${port} ...`);
});

