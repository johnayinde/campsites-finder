// start
// check if user is logged in
// if the user own the post
// otherwise redirect
// if not redirect
module.exports = function campgroundOwnership(req, res, next) {
   if (req.isAuthenticated()) {
      Campground.findById(req.params.id, (err, campground) => {
         console.log('found campground', campground);
         if (err) {
            res.redirect('back')
         } else {
            if (campground.author.id.equals(req.user._id)) {
               next()
            } else {
               console.log('you cannot edit this post')
               res.redirect('back')
            }
         }
      })
   } else {
      res.redirect('back')

   }
}

// ends
