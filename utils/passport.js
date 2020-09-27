const localStrategy = require('passport-local'),
    passport = require('passport'),
    User = require('../models/user');

module.exports = function (app) {
    /**
    * ============
    *  PASSPORT CONFIGS
    * ===========
    */

    app.use(require('express-session')({
        secret: "my secret", resave: false, saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

}