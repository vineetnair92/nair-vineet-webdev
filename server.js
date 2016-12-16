var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var connectionString = 'mongodb://127.0.0.1:27017/webdev';
if (process.env.WEB_CONCURRENCY) {
    connectionString = process.env.MONGODB_URI;
}

var db=mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require("./test/app.js")(app);

var secret = "Secet Code";
if(process.env.WEB_CONCURRENCY ) {
    secret = process.env.SESSION_SECRET;
}

app.use(session({ secret: secret, saveUninitialized: true, resave: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var projectUserModel = require("./project/models/user/user.models.server")(db, mongoose);
require("./public/security.js")(app, /*assignUserModel,*/ projectUserModel);

require("./project/app.js")(app,db,mongoose,projectUserModel);
app.set('ipaddress', (process.env.IP));
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), app.get('ipaddress'));