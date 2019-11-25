const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser');
const oauthController = require('./controllers/oauthController')

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../dist')));



app.listen(3000, () => { console.log('Listening on port 3000!') })