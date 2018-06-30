const express = require('express');
const app = express();
require('dotenv').config()
const config = require('config')
const conn = require('./lib/conn')

const port = process.env.PORT || 3001;

app.get('/api/getquote', (req, res) => {
//   res.send({ express: 'Hello From Express' });
    console.log('in server')
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

app.get('/api/toggle_active_status', (req, res, next) => {
    console.log('toggle active status')
    const sql = `
        UPDATE users
        SET active_status = !active_status
        WHERE name = 'biff';
    `
    const sql2 = `
        UPDATE users 
        SET active_status = CASE WHEN active_status = 1 THEN 0 ELSE 1 END 
        WHERE name = 'biff';
    `
    const sql3 = `
        UPDATE users
        SET active_status = '5'
        WHERE name = 'biff'
    `
    conn.query(sql, (err, results, fields) => {
        console.log(results + " record(s) updated");
        res.send({
            results
        })
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));