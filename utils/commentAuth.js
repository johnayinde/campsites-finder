const Comment = require('../models/comment');
// start
// check if user is logged in
// if the user own the post
// otherwise redirect
// if not redirect
module.exports = function commentOwnership(req, res, next) {
   if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, (err, foundComment) => {
         console.log('foundComment', foundComment);
         if (err) {
            res.redirect('back')
         } else {
            if (foundComment.author.id.equals(req.user._id)) {
               return next()
            } else {
               console.log('you cannot edit this post')
               res.redirect('back')
            }
         }
      })
   } else {
      console.log('you need to login');
      res.redirect('back')

   }
}

