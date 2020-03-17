const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const session = require('express-session')
const cors = require('cors');
const fetch = require('node-fetch')

let accToken, LIprofile;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res, next) => {
  if (req.cookies.isLoggedIn) {
    res.status(200).sendFile(path.resolve(__dirname, '../src/index.html'))
  }
  else {
    res.redirect('/login')
  }
})

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
  clientID:'78t6l1x2aongm0',
  clientSecret:'uK0eg5HYTtA8KsuQ',
  callbackURL:'http://localhost:3000/main',
  scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social'],
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
    accToken = accessToken;
    LIprofile = profile;
    console.log('access token', accessToken)
    console.log('profile:', profile, 'end')
    return done(null, profile);
  });
 }));

 passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});


app.get('/login', (req, res, next) => {
  console.log('inside http get request for login')
  res.status(200).sendFile(path.resolve(__dirname, '../src/login.html'))
})

app.post('/login', (req, res, next) => {
  console.log('grabbing cookie for login')
    res.cookie('isLoggedIn', true, {maxAge: 360000});
    next();
  },
  passport.authenticate('linkedin')
);

app.post('/postArticle', (req, res, next) => {
  console.log("hit /postArticles", req.body);
  fetch(`https://api.linkedin.com/v2/shares?oauth2_access_token=${accToken}`, {
    headers: {"Content-type" : "application/json"},
    method: "POST",
    body: JSON.stringify(req.body),
  }).then(res => res.json())
  .then(res => console.log("RESULTS OF POST:", res))
})

app.get('/main', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

app.get("/access", (req, res) => {
  res.status(200).send({ token: accToken, profile: LIprofile })
})

app.post('/postUser', userController.checkIfUser, (req, res)=>{
  // user data on req body ready to send to front if needed
  res
  .status(200)
  .send('posted user to the database');
})

app.post('/postInterests', userController.postInterests,(req,res) =>{
  res
  .status(200)
  .send('posted favorites to the database')
})

app.get('/getInterests', userController.getInterests,(req,res) =>{
  console.log('getting Interests')
  res
  .status(200)
  .send('retrieved data from the database');
})

app.listen(3000, () => { console.log('Listening on port 3000!'); });
