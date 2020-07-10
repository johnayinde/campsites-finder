const router = require('express').Router(),
   Comment = require('../models/comment'),
   Campground = require('../models/campground'),
   isLoggedIn = require('../utils/auth');

// Render Comment form
router.get('/new', isLoggedIn, (req, res) => {
   Campground.findById(req.params.id, (err, result) => {
      if (err) throw err;
      console.log(result);

      res.render('comments/new', { result });
   })
});

//  Create Comment 
router.post('/', isLoggedIn, (req, res) => {
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

module.exports = router
