const pool = require('../models/userModel')

module.exports = {
  checkIfUser(req, res, next) {
    const { linkedinId } = req.body
        // const { id, firstName } = result;

        const queryString = `CREATE TABLE IF NOT EXISTS user (
          id varchar NOT NULL,
          user varchar NOT NULL,
          )`

        const values = [id, user]

        pool.query(queryString, values, (err, results) => {
          if (err) {
            return console.error('Error:', err)
          }
          else {
            console.log('added user to database if they haven\'t been inputted previously')
          }
        })
     
  }
}