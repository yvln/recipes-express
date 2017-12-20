// require packages and set up variables
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      port = process.env.PORT || 3000,
      cors = require('cors')

require('dotenv').config();
// use cors so we can talk to our other server
app.use(cors());

// body parser to get form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up base routes
app.use('/', require('./controllers/recipes-controller'));

// listen on port and run server
app.listen(port, () => console.log('SERVER LISTENING ON:', port));