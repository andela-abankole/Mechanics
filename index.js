// index.js

//BASE SETUP
require('dotenv').load();
var Mechanic      = require('./scripts/models/mechanic.model');
var Admin         = require('./scripts/models/admin.model') // get our mongoose model

//call the packages we need
var express       = require('express');       // call express
var app           = express();                // define our app using express
var bodyParser    = require('body-parser');
var morgan        = require('morgan');
var mongoose      = require('mongoose');

var config        = require('./config');      // get our config file
var routes        = require('./scripts/routes');


var port = process.env.PORT || 3000;        // set our port
mongoose.connect(config.database);          // connect to database

// configure app to sue bodyParser() this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

//ROUTES FOR OUR API
var router = express.Router();              // get an instance of the express Router

/** REGISTER OUR ROUTES _ _ _ _
  * all of our routes will be prefixed with /api
  **/
app.use('/api', router);
routes(router);

// START THE SERVER

app.listen(port);
console.log('Magician: Magic happens on port ' + port);