
const router = require('express').Router(),
   Campground = require('../models/campground'),
   User = require('../models/user'),
   middleware = require('../utils/index');


// Get All Campgrounds
router.get('/', (req, res) => {
   Campground.find({}, (error, result) => {
      if (error) console.log(error);
      else res.render('campgrounds/campground', { campgrounds: result });
      console.log("loggedin:", req.user);
      // console.log("userIcon:", userIcon);

   })
});

// Render camp form
router.get('/new', middleware.isLoggedIn, (req, res) => {
   res.render('campgrounds/new');
});

// Create New Campgrounds
router.post('/', middleware.isLoggedIn, (req, res) => {
   const { name, image, description, price } = req.body;
   Campground.create({ name, image, description, price }, (error, result) => {
      if (error) console.log(error);
      else {
         // Add author id and username
         result.author.id = req.user._id;
         result.author.username = req.user.username;
         // Save author id and username
         result.save()
         // save individual post to user DB
         User.findByIdAndUpdate(result.author.id, { $push: { posts: result._id } }, { useFindAndModify: false }, (err, updated) => {
            if (err) throw err;
            res.redirect('/campgrounds');
            console.log('updated User:' + updated);
         })
      }
   });

});


// GEt Single Campgrounds
router.get('/:id', (req, res) => {
   // find from db using id 
   Campground.findById(req.params.id).populate('comments').exec((error, doc) => {
      if (error) console.log(error);
      User.findOne({ username: doc.author.username }, (err, data) => {
         if (err) console.log(err);
         res.render('campgrounds/show', { campgrounds: doc, user: data });
      })
   })

});

// Show Edit page
router.get('/:id/edit', middleware.campgroundOwnership, (req, res) => {
   Campground.findById(req.params.id, (err, campground) => {
      res.render('campgrounds/edit', { campground });
   })
});


// Edit Campground
router.put('/:id', middleware.campgroundOwnership, (req, res) => {
   const id = req.params.id;
   const UpdatedData = {
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      description: req.body.description,
   }
   Campground.findByIdAndUpdate(id, UpdatedData, { useFindAndModify: false }, (err, campground) => {
      if (err) {
         console.log(err);
         res.redirect(`/campgrounds/${id}/edit`);
      }
      res.redirect(`/campgrounds/${id}`);


   })
});

// Delete Campground
router.delete('/:id', middleware.campgroundOwnership, (req, res) => {
   const id = req.params.id;

   Campground.findByIdAndDelete(id, (err, result) => {
      console.log('message to delete', result);
      if (err) {
         console.log(err);
         res.redirect(`/campgrounds/${id}`);
      }

      User.findByIdAndUpdate(result.author.id, { $pull: { posts: id } }, { useFindAndModify: false }, (err, deleted) => {
         if (err) {
            console.log(err)
         };
         req.flash('success', "Comment deleted")
         res.redirect('/campgrounds');

      })
   })
});

module.exports = router;
