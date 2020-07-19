const { get } = require('mongoose');
const { post } = require('./campground');

const User = require('../models/user'),
   router = require('express').Router(),
   Campground = require('../models/campground'),
   middleware = require('../utils/index');


router.get('/:username', (req, res) => {
   User.findOne({ username: req.params.username }).populate('posts').exec((err, result) => {
      if (err) {
         res.redirect('back')
      }
      console.log(result);
      res.render('users/profile', { profile: result });


   })
   // res.send('got the username')
});

router.get(':username/edit', (req, res) => {

})

router.put(':username', (req, res) => {

})

router.delete(':username', (req, res) => {

})

module.exports = router;