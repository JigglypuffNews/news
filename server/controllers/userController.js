const pool = require('../models/userModel')

module.exports = {
  checkIfUser(req, res, next) {

    fetch('GET https://api.linkedin.com/v2/me')
      .then(data => data.json())
      .then(result => {
        const { id, firstName } = result;

        const queryString = `CREATE TABLE IF NOT EXISTS user (
          id varchar NOT NULL,
          firstName varchar NOT NULL,
          interests varchar,
          favorites varchar,
          )`

        const values = [id, firstName]

        pool.query(queryString, values, (err, results) => {
          if (err) {
            return console.error('Error:', err)
          }
          else {
            console.log('added user to database if they haven\'t been inputted previously')
          }
        })
      })
  }
}