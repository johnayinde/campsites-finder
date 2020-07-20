const express = require('express'),
    bodyParser = require('body-parser'),
    localStrategy = require('passport-local'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    app = express();

const campgroundRoute = require('./routes/campground'),
    commentRoute = require('./routes/comments'),
    authRoute = require('./routes/auth'),
    usersRoute = require('./routes/users'),
    url = 'mongodb://localhost/yelp_camp',
    User = require('./models/user'),
    sedDb = require('./seed');

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })


// sedDb();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(flash());

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
    // res.locals.userIcon = User.findOne(req.user._id)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// Route Middlewares
app.use('/campgrounds', campgroundRoute);
app.use('/users', usersRoute);
app.use('/', authRoute);
app.use('/campgrounds/:id/comments', commentRoute);

// Running Port
app.listen(3000, function () {
    console.log('serving port 3000')
})
