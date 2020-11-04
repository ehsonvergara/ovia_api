const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bbx_ovialand"
})

connection.connect((err) => {
    if (err) {
        console.log(err)
    }
    // console.log(connection.threadId)
});

module.exports = connection;
