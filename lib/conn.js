const mysql = require('mysql')
const config = ('config')

// var connection = mysql.createConnection({
//     host : config.get('db.hostname'),
//     user : config.get('db.user'),
//     password : config.get('db.password'),
//     database : config.get('db.database')
// })

var connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : "death_app"
})


connection.connect()

module.exports = connection
