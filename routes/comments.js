const router = require('express').Router({ mergeParams: true }),
   Comment = require('../models/comment'),
   Campground = require('../models/campground'),
   middleware = require('../utils/index');



// Render Comment form
router.get('/new', middleware.isLoggedIn, (req, res) => {
   Campground.findById(req.params.id, (err, result) => {
      if (err) throw err;
      res.render('comments/new', { result });
   })
});

//  Create Comment 
router.post('/', middleware.isLoggedIn, (req, res) => {
   const id = req.params.id;
   Comment.create(req.body, (err, comment) => {
      if (err) throw err;

      Campground.findById(req.params.id, (err, campground) => {
         if (err) {
            console.log(err)
         };
         // add username and id to comment
         comment.author.id = req.user._id;
         comment.author.username = req.user.username;
         // save comment
         comment.save()

         campground.comments.push(comment._id);
         campground.save();

         req.flash('success', "Successfully added comment")
         res.redirect(`/campgrounds/${id}`)

      })
   })

});

// EDIT form
router.get('/:comment_id/edit', middleware.commentOwnership, (req, res) => {
   Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
         console.log(err)
         res.redirect('back');
      };
      res.render('comments/edit', { campgrounds: req.params.id, comment: foundComment });
   })
})

// EDIT comment
router.put('/:comment_id', middleware.commentOwnership, (req, res) => {
   const id = req.params.id,
      comment_id = req.params.comment_id,
      UpdatedData = {
         text: req.body.text,
      };
   Comment.findByIdAndUpdate(comment_id, UpdatedData, { useFindAndModify: false },
      (err, foundComment) => {
         if (err) {
            res.redirect('back');
         };
         req.flash('success', "Comment updated")
         res.redirect(`/campgrounds/${id}`);
      })

})

// DELETE comment
router.delete('/:comment_id', middleware.commentOwnership, (req, res) => {
   const id = req.params.id,
      comment_id = req.params.comment_id;
   Comment.findByIdAndDelete(comment_id, { useFindAndModify: false }, (err, deleted) => {
      if (err) {
         console.log(err)
         res.redirect('back');
      };
      Campground.updateOne({ _id: req.params.id }, { $pull: { comments: comment_id } }, (err, campground) => {
         if (err) {
            console.log(err)
         };
         req.flash('success', "Comment deleted")
         res.redirect(`/campgrounds/${id}`);
      })
   })
});


module.exports = router;

