const pool = require('../models/userModel')

module.exports = {
  // removed variables as this wont be express middleware anymore
  checkIfUser(req, res, next) {
    console.log('INSIDE CHECK IF USER MIDDLEWARE');
    const { id, displayName } = req.body;
    console.log('REQ BODY -->', req.body);
    // added $1 to query string - may not be proper syntax
    const queryString = 'INSERT INTO users (id, username) VALUES ($1, $2)';
    const values = [id, displayName]; 
    pool.query(queryString, values)
    .then(userData => {
      if (!userData) console.log('Error in checkIfUser function')
      else {
        res.locals.userData = userData;
        return next();
      }
    })
    .catch(err => console.error(err))
  },

  postInterests(req,res,next){
    console.log('within Post Topics middleware')
    const { interests, user_id } = req.body;
    res.locals.interests = [];
    interests.forEach(elem => {
      const queryString = 'INSERT INTO interests (id, interest) VALUES ($1, $2)';
      const values = [user_id, elem]
      pool.query(queryString, values)
      .then(data => {
        console.log('DATA FROM POOL QUERY IN POST INTEREST -->', data)
        // res.locals.interests.push(data)
      })
      .catch(err => console.error(err))
    })
  },

  getInterests(req,res,next){
    const { id } = req.body;
    const queryString = 'SELECT * FROM interests WHERE id=$1';
    pool.query(queryString, [id])
    .then(data =>  {
      const interestArr = [];
      data.rows.forEach(elem => (interestArr.push(elem.interest)))
      res.locals.interests = interestArr
      return next();
    })
    .catch(err => console.error(err))
  },

  // STRETCH
  // postFavs(req,res,next){},
  
  // getFavs(req,res,next){},
  
};
