const { Pool } = require('pg');

const myURI = 'postgres://guzxurzd:qyDzY1Z4VnJoJ6iC2vbYA3Owr3jnIHoA@isilo.db.elephantsql.com:5432/guzxurzd'

const uri = process.env.uri || myURI;

const pool = new Pool({
  connectionString: uri,
  port: 5432,
});

pool.connect(err => {
  if (err) console.log('ERROR CONNECTING TO DB: ', err);
  else console.log('Connected to DB on port 5432')
})

module.exports = pool;