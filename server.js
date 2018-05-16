const express = require('express');
const app = express();
const config = require('config')
const conn = require('./lib/conn')

const port = process.env.PORT || 3001;

app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });

  const sql = `
    SELECT * FROM quotes
  `
  conn.query(sql, (err, results, fields) => {
      console.log('results',results)
      res.json({
          quote: results[0]
      })
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));