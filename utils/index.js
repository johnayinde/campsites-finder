const Comment = require('../models/comment'),
   Campground = require('../models/campground');

// start
// check if user is logged in
// if the user own the post
// otherwise redirect
// if not redirect
const middleware = {}
middleware.commentOwnership = (req, res, next) => {
   if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, (err, foundComment) => {
         console.log('foundComment', foundComment);
         if (err) {
            res.redirect('back')
         } else {
            if (foundComment.author.id.equals(req.user._id)) {
               return next()
            } else {
               req.flash('error', "You don't have premission to do that")
               res.redirect('back')
            }
         }
      })
   } else {
      req.flash('error', "You need to login to do that")
      res.redirect('back')

   }
}


// start
// check if user is logged in
// if the user own the post
// otherwise redirect
// if not redirect
middleware.campgroundOwnership = (req, res, next) => {
   if (req.isAuthenticated()) {
      Campground.findById(req.params.id, (err, campground) => {
         if (err) {
            req.flash('error', "Error occure")
            res.redirect('back')
         } else {
            if (campground.author.id.equals(req.user._id)) {
               next()
            } else {
               req.flash('error', "You don't have premission to do that")
               res.redirect('back')
            }
         }
      })
   } else {
      req.flash('error', "You need to login to do that")
      res.redirect('back')
   }
}

//   Middleware (Login)
middleware.isLoggedIn = (req, res, next) => {
   if (req.isAuthenticated()) {
      return next()
   }
   req.flash('error', "You need to login to do that")
   res.redirect('/login');
}

module.exports = middleware;