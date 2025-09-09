var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var createError = require('http-errors');

var indexRouter = require('./routes/index');
var growcropRouter = require('./routes/growcrop');
var fertilizersRouter = require('./routes/fertilizers');
var sellcropRouter = require('./routes/sellcrop');
app.use('/growcrop', growcropRouter);
app.use('/fertilizers', fertilizersRouter);
app.use('/sellcrop', sellcropRouter);

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'super_secret_session_key_123',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(express.static(path.join(__dirname, 'public')));

// Language persistence middleware
app.use(function(req, res, next) {
  if (req.query.lang) {
    req.session.lang = req.query.lang;
  }
  res.locals.lang = req.session.lang || 'en';
  res.locals.helpBotEnabled = true; // Enable help bot on all pages
  next();
});

// Mount routers
app.use('/', indexRouter);
app.use('/growcrop', growcropRouter);
app.use('/fertilizers', fertilizersRouter);
app.use('/sellcrop', sellcropRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

if (require.main === module) {
  var http = require('http');
  var port = process.env.PORT || 3000;
  app.set('port', port);

  var server = http.createServer(app);
  server.listen(port, function() {
    console.log('Express server listening on port ' + port);
  });
}
