var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var expressSession = require('express-session');
var router = express.Router();

var User = require('../models/Users.js')



router.use(expressSession({ secret: 'mySecretKey' }));

router.use(passport.initialize());
router.use(passport.session());


//auth with facebook strategy
router.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html' + req.user);
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));

passport.use(new FacebookStrategy({
    clientID: '1771236643200897',
    clientSecret: 'c68ee6532ac101fa8cc3344f7b3b51e4',
    callbackURL: "http://localhost:8000/auth/facebook/callback",
    profileFields: ['id', 'email', 'displayName', 'photos'],
    passReqToCallback:true

  },
  function(accessToken, refreshToken, profile, done) {
    console.log("accessToken:");
    console.log(accessToken);

    console.log("refreshToken:");
    console.log(refreshToken);

    console.log("profile:");
    console.log(profile);

    return done(null, profile);
  }
));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/facebookCanceled'
}));


// route for showing the profile page
router.get('/profile', function(req, res) {
  res.send(req.user);
});

  router.get('/facebookCanceled', function(req, res) {
    res.send("fail!");
  });

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // used to deserialize the user
passport.deserializeUser(function(user, done) {
  done(null, user);
});
module.exports = router;
