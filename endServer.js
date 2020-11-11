const express = require("express");
const path = require("path");
const db = require("./dbconfig.js");
const cors = require("cors");
const bodyParser = require('body-parser');
// const { json } = require("express");


const app = express();

app.use(express.static(path.join(__filename, 'dbconfig')));
const port = process.env.port || 3306;

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

app.post('/try', function (request, response) {
    console.log(request.body);      // your JSON
    response.send(request.body);    // echo the result back
});

app.post("/api/login", (req, res, next) => {

    let userName = req.body.userName;
    let password = req.body.password;

    // db.query("select * from useraccount where userName = 'e@e' and password= 'q'", (error, results, fields) => {
    db.query("select * from useraccount  where userName = ?  and password= ?", [userName, password], (error, results, fields) => {
        if (error) throw error;
        const result = JSON.stringify(results);
        let user = {
            userName: result.userName,
            role: result.userName,
            token: '1'
        };

        // console.log(results);
        // res.send(result);
        res.send(result);
        res.end()

    })



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

app.post("/api/createadminaccount", (req, res) => {

    console.log(req);

    userName = req.body.email,
        password = req.body.password,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        address = req.body.address,
        gender = req.body.gender,
        role = req.body.role,
        db.query("insert into useraccount set ?",
            {
                userName: userName,
                password: password,
                firstName: firstName,
                lastName: lastName,
                address: address,
                gender: gender,
                role: role,

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

