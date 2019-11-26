const pool = require('../models/userModel')

module.exports = {
  // removed variables as this wont be express middleware anymore
  checkIfUser(id, displayName) {
    console.log('INSIDE CHECK IF USER MIDDLEWARE')

    // added $1 to query string - may not be proper syntax
    const queryString = 'INSERT INTO users (id, user) VALUES ($1, $2)';

    const values = [id, displayName];

    pool.query(queryString, values, (err, results) => {
      if (err) {
        return console.error('Error:', err);
      }
      else {
        console.log('added user to database if they haven\'t been inputted previously');
      }
    });
  },
};
