const router = require('express').Router(),
   passport = require('passport'),
   User = require('../models/user');

// Root route
router.get('/', (req, res) => {
   res.render('home');
})

// Show register
router.get('/register', (req, res) => {
   res.render('register');
});

// Registration route
router.post('/register', (req, res) => {
   console.log(req.body);

   const newUsername = new User({ username: req.body.username, avatar: req.body.avatar });
   const newPassword = req.body.password;
   User.register(newUsername, newPassword, (err, user) => {
      if (err) {
         req.flash('error', err.message);
         res.redirect('/register')
      }
      passport.authenticate('local')(req, res, function () {
         req.flash('success', "Successfully registered, Welcome " + user.username)
         res.redirect('/campgrounds');
      })
   })
});

// Show Login
router.get('/login', (req, res) => {
   res.render('login');
});

// Login route
router.post('/login', passport.authenticate('local', {
   successRedirect: '/campgrounds',
   failureRedirect: '/login'
}), (req, res) => {
});

// Logout route
router.get('/logout', (req, res) => {
   req.logout();
   req.flash('success', "Logged out successfully")
   res.redirect('/campgrounds');

})

module.exports = router