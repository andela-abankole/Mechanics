// index.js

// SET UP ======================================================================
require('dotenv').load();
var Mechanic        = require('./app/models/mechanic.model');
var Admin           = require('./app/models/admin.model') // get mongoose model

//call the packages we need
var express         = require('express'); // call express
var app             = express();  // define app using express
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var mongoose        = require('mongoose');
var methodOverride  = require('method-override'); //simulate DELETE and PUT
var config          = require('./config/config'); // get config file
var routes          = require('./app/routes');
var cloudinary      = require('cloudinary');
var fs              = require('fs')
var port            = process.env.PORT || 3000;  // set port


// CONFIGURATION =================================================================
mongoose.connect(config.database);   // connect to database

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));                 

// configure app to sue bodyParser() this will get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));  // parse application/vnd.api+json as json
app.use(morgan('dev'));

app.use(methodOverride());

cloudinary.config(config.cloudinary);

// ROUTES =========================================================================
var router = express.Router(); // get an instance of the express Router

// middleware for all requests
router.use(function(req, res, next){
  console.log('New API call', req.method, req.url);
  next();
});

//all routes will be prefixed with /api
app.use('/api', router);
routes(router);

app.get('*', function(req, res) {
  res.sendFile(process.cwd() + '/public/index.html'); // load the single view file (angular will handle the page changes on the front end)
});

// START THE SERVER =================================================================
app.listen(port);
console.log('Magician: Magic happens on port ' + port);