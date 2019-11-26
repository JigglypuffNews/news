const pool = require('../models/userModel')

module.exports = {
  // removed variables as this wont be express middleware anymore
  checkIfUser(req, res, next) {
    console.log('INSIDE CHECK IF USER MIDDLEWARE');
    const { id, displayName } = req.body;
    console.log('REQ BODY -->', req.body)
    // added $1 to query string - may not be proper syntax
    const queryString = 'INSERT INTO users (id, user) VALUES ($1, $2)';
    const values = [id, displayName];
    pool.query(queryString, values).then(userData => {
      if (!userData) return next();
      res.locals.messages = userData;
      return next();
    })},
      

    //   (err) => {
    //   if (err) return console.error('Error:', err);
      
    // }).then((data) => {
    //   res.locals.userData = data;
    //   console.log('inside promise', res.locals.userData)
    //   return next();
    // });
};
