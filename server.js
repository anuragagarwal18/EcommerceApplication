const express = require("express");
const path = require("path");
const app = express();
const logger = require('morgan');
app.use(logger('dev'));

// Configuration reference
app.config = require('./config.js');

const mongoose = require('mongoose');
const dbURI = app.config.MONGO_URI;

// Parsing requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '5mb'
}));
app.use(bodyParser.json({
    limit: '5mb'
}));

app.schema = {};

 //CORS Configure
 var allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
};

app.use(allowCrossDomain);

// require all the files
require('./models')(app, mongoose);
require('./routes.js')(app);
// Mongoose Promise
mongoose.Promise = global.Promise;

// Mongoose Database connection (with auto-increment initialization)
var connection = mongoose.connect(dbURI);
mongoose.connection.on('error', function (err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

// Run the app by serving the static files

app.use(express.static(__dirname + "/public"));
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

// Start the app by listening on the default
app.set('port', process.env.PORT || 8080);
var listener = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
