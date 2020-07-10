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

// Show Login
router.get('/login', (req, res) => {
   res.render('login');
});

// Login route
router.post('/login', passport.authenticate('local', {
   successRedirect: '/campgrounds',
   failureRedirect: '/login'
}), (req, res) => {
   console.log('login details', req.body);
});

// Logout route
router.get('/logout', (req, res) => {
   req.logout();
   res.redirect('/campgrounds');

})

module.exports = router