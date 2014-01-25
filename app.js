
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var flash = require('connect-flash')
var passport = require('passport');

var app = express();
require('./config/passport')(passport);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());

app.use(express.logger('dev'));

app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.session({
  secret: '9cb1fafa4f464822f4fbbe48f3436faf'
}));

// Flash
app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Static Files
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// App Router - Call last
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Routing
var routes = require('./routes')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
