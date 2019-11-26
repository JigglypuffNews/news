const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
// const cookieParser = require('cookie-parser');
// const oauthController = require('./controllers/oauthController')
const userController = require('./controllers/userController');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const session = require('express-session')
// const LinkedInStrategy = passportLI.Strategy;


app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../dist')));
//move secret to env later
app.use(session(({
  secret: 'abcx',
  resave: true,
  saveUninitialized: true
})));
app.use(passport.initialize());
app.use(passport.session());

// require('./config/passport')(passport);
passport.use(new LinkedInStrategy({
  clientID:'77mmt6otf0l7cw',
  clientSecret:'I6IAlHNXbgzJ1Hn1',
  callbackURL:'http://localhost:3000/main',
  scope: ['r_emailaddress', 'r_liteprofile'],
  state: true,
},
 function (accessToken, refreshToken, profile, done) {
   console.log('INSIDE ANONYMOUS FUNC')
  // asynchronous verification, for effect...
   process.nextTick(function () {
    // create obj of necessary user info
    // add user to db with middleware
    // move on
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
 }));

 passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});


app.get('/login', passport.authenticate('linkedin')
// ,(req, res) => {
//   console.log('WE SHOULDN\'T SEE THIS CONSOLE LOG IN GET /login');
// }
);

app.get('/main', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

app.post('/postUser', userController.checkIfUser, (req, res)=>{
  console.log('RES LOCALS IN SERVER AFTER MIDDLEWARE -->', res.locals.userData)
  // res.status(200).send(res.locals.userData);
})

app.listen(3000, () => { console.log('Listening on port 3000!'); });