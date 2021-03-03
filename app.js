const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
//New additions since last presentation
const passport = require('passport');
const User = require('mongoose').model('User');
const flash = require("connect-flash");
const LocalStrategy = require('passport-local').Strategy;
const {methodOverride, globalLocals} = require("./middleware/middlewares");

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride); //new
app.use(session({ secret: "cats" })); //new
app.use(cookieParser());
app.use(flash()); //new
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Passport setup
app.use(passport.initialize()); //new
app.use(passport.session()); //new
passport.serializeUser(function (user, done) {
  done(null, user);
});//new
passport.deserializeUser(function (user, done) {
  done(null, user);
});//new
passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password !== password) { return done(null, false); }
      return done(null, user);
    });
  }
));//new

app.use(globalLocals); //new
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;