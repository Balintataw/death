const express = require('express');
const app = express();
const config = require('config')
const conn = require('./lib/conn')

const port = process.env.PORT || 3001;

app.get('/api/getquote', (req, res) => {
//   res.send({ express: 'Hello From Express' });

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

app.listen(port, () => console.log(`Listening on port ${port}`));