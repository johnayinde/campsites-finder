const express = require('express'),
    bodyParser = require('body-parser'),
    localStrategy = require('passport-local'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    app = express();

const campground = require('./models/campground'),
    campgroundRoute = require('./routes/campground'),
    commentRoute = require('./routes/comments'),
    authRoute = require('./routes/auth'),
    url = 'mongodb://localhost/yelp_camp',
    User = require('./models/user'),
    sedDb = require('./seed');

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })


sedDb();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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


// Global Variable for all templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

// Route Middlewares
app.use('/campgrounds', campgroundRoute);
app.use('/', authRoute);
app.use('/campgrounds/:id/comments', commentRoute);

// Running Port
app.listen(3000, function () {
    console.log('serving port 3000')
})
