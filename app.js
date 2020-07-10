const campground = require('./models/campground');

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    localStrategy = require('passport-local'),
    passport = require('passport'),
    url = 'mongodb://localhost/yelp_camp',
    User = require('./models/user'),
    Comment = require('./models/comment'),
    Campground = require('./models/campground'),
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


// route for home page
app.get('/', (req, res) => {
    res.render('home');
})

// route for list of campgrounds
app.get('/campgrounds', (req, res) => {
    Campground.find({}, (error, result) => {
        if (error) console.log(error);
        else res.render('campgrounds/campground', { campgrounds: result });
    })
});

app.post('/campgrounds', (req, res) => {
    const { name, image, description } = req.body;
    Campground.create({ name, image, description }, (error, result) => {
        if (error) console.log(error);
        else {
            console.log("created: ", result);
            res.redirect('/campgrounds');
        }
    });

});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', (req, res) => {
    // find from db using id 
    Campground.findById(req.params.id).populate('comments').exec((error, doc) => {
        if (error) console.log(error);
        else res.render('campgrounds/show', { details: doc });
    })

});

/**
 * ============
 * COMMENT ROUTES
 * ===========
 */
app.get('/campgrounds/:id/comments/new', (req, res) => {
    Campground.findById(req.params.id, (err, result) => {
        if (err) throw err;
        console.log(result);

        res.render('comments/new', { result });
    })
});

app.post('/campgrounds/:id/comments', (req, res) => {
    const id = req.params.id;
    Comment.create(req.body, (err, comment) => {
        if (err) throw err;
        console.log("new comment created", comment);

        Campground.findById(req.params.id, (err, campground) => {
            if (err) throw err;
            console.log('found campground ', campground);

            campground.comments.push(comment._id);
            console.log('added new comment to post');

            campground.save();
            res.redirect(`/campgrounds/${id}`)

        })
    })

});

/**
 * ============
 * AUTH ROUTES
 * ===========
 */

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    console.log(req.body);
    const newUsername = new User({ username: req.body.username });
    const newPassword = req.body.password;
    User.register(newUsername, newPassword, (err, user) => {
        if (err) {
            console.log(err);
            res.render('register')
            console.log('reserve register page');
        }
        passport.authenticate('local')(req, res, function () {
            console.log('signup success');

            res.redirect('/campgrounds');

        })

    })
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {
    console.log('login details', req.body);
});



app.listen(3000, function () {
    console.log('serving port 3000')
})
