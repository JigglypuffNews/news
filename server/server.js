const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser');
const oauthController = require('./controllers/oauthController')

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../dist')));

// app.use((err, req, res) => {
//   const defaultError = {
//     log: 'At global error handler',
//     message: 'Unexpected Error :(',
//   }
//   // newError: in case error doesn't have a log or message key in it
//   const newError = { ...defaultError, ...err }
//   console.log(newError.log);
//   res.json({ error: newError.message, });
// });

app.listen(3000, () => { console.log('Listening on port 3000!') })