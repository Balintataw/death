const express = require('express');
const app = express();
require('dotenv').config()
const config = require('config')
const conn = require('./lib/conn')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/getquote', (req, res) => {
    const sql = `
        SELECT * FROM quotes
    `
    const sqlRandom = `
    SELECT quotes
    FROM quotes AS q1 JOIN
            (SELECT CEIL(RAND() *
                        (SELECT MAX(id)
                            FROM quotes)) AS id)
            AS q2
        WHERE q1.id >= q2.id
        ORDER BY q1.id ASC
        LIMIT 1;
    `
    conn.query(sqlRandom, (err, results, fields) => {
        console.log('results',results)
        res.json({
            quote: results[0]
        })
    })
});

app.get('/api/get_active_status', (req, res, next) => {
    const sql = `
        SELECT active_status
        FROM users
        WHERE name = 'biff';
    `
    conn.query(sql, (err, results, fields) => {
        res.json({
            results
        })
    })
})

app.post('/api/toggle_active_status', (req, res, next) => {
    const sql = `
        UPDATE users
        SET active_status = !active_status
        WHERE name = 'biff';
    `
    conn.query(sql, (err, results, fields) => {
        res.send({
            results
        })
    })
})

app.post('/api/set_message_type', (req, res, next) => {
    const type = req.body.type
    const sql = `
        UPDATE users
        SET current_message_type = ?
        WHERE name = 'biff'; 
    `
    conn.query(sql, [type], (err, results, fields) => {
        res.send({
            results
        })
    })
})
