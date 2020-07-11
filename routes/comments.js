const router = require('express').Router({ mergeParams: true }),
   Comment = require('../models/comment'),
   Campground = require('../models/campground'),
   isLoggedIn = require('../utils/auth');

// Render Comment form
router.get('/new', isLoggedIn, (req, res) => {
   Campground.findById(req.params.id, (err, result) => {
      if (err) throw err;
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
         if (err) {
            console.log(err)
         };
         console.log('found campground ', campground);
         // add username and id to comment
         comment.author.id = req.user._id;
         comment.author.username = req.user.username;
         // save comment
         comment.save()
         campground.comments.push(comment._id);
         campground.save();
         console.log('added new comment to post', comment);
         res.redirect(`/campgrounds/${id}`)

      })
   })

});

module.exports = router
