const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('./config/db')
var signlogin = require('./signup-login/signuplogin')

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/signuplogin', signlogin);

app.listen(process.env.PORT || 3000,function(){
    console.log("Yeah I am connected");
  });
  
  module.exports = app;