const mysql = require('mysql')
const config = ('config')

// var connection = mysql.createConnection({
//     host : config.get('db.hostname'),
//     user : config.get('db.user'),
//     password : config.get('db.password'),
//     database : config.get('db.database')
// })

var connection = mysql.createConnection({
    host : "localhost",
    user : "hariDeath",
    password : "password",
    database : "death_app"
})


connection.connect()

module.exports = connection
