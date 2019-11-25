const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

app.use(express.static('/dist'));

app.use(bodyParser.json());

app.listen(3000, () => { console.log('Listening on port 3000!') })