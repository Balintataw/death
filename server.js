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

app.post('/api/toggle_notification_status', (req, res, next) => {
    let command = req.body.command
    //TODO: be able to pass in hour options
    //random hour can be any hour of the day
    // var randHour = startHour + Math.random() * (endHour - startHour) | 0;
    let randHour = 0 + Math.random() * (23 - 16) | 0; 

    console.log('command', command)
    if (command == 'run') {

        setInterval(() => {
            //setting timer
            const currentHour = new Date().getHours()

            if (currentHour == 0 && randHour == 0) {
                console.log('resetting notification hour')
                // usefull for user setting hours to accept notification
                // randHour = startHour + Math.random() * (endHour - startHour) | 0;
                
            } else if (currentHour == 0) {
                //set hour of next message, make query to set time in user db
                // randHour = startHour + Math.random() * (endHour - startHour) | 0;
                randHour = 0 + Math.random() * 23 | 0; 
            }
            console.log('random hour', randHour)
            console.log('current hour', currentHour)
            
            //get random quote
            if (currentHour == randHour) {
                console.log('sending notification')
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
                //reset hour and wait for new day to reset
                randHour = 0
            } else {
                console.log('waiting patiently1')
                //do nothing
            }

        }, 5000)
    } else {
        console.log('waiting patiently2')
    }

})

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

app.get('/api/toggle_active_status', (req, res, next) => {
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
