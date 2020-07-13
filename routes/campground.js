const router = require('express').Router(),
   Campground = require('../models/campground'),
   isLoggedIn = require('../utils/auth');


// Get All Campgrounds
router.get('/', (req, res) => {
   console.log('current User', req.user);

   Campground.find({}, (error, result) => {
      if (error) console.log(error);
      else res.render('campgrounds/campground', { campgrounds: result });
   })
});

// Create New Campgrounds
router.post('/', isLoggedIn, (req, res) => {
   const { name, image, description } = req.body;
   Campground.create({ name, image, description }, (error, result) => {
      if (error) console.log(error);
      else {
         console.log('create camp', result);
         // Add author id and username
         result.author.id = req.user._id;
         result.author.username = req.user.username;
         // Save author id and username
         result.save();
         console.log("save author ", result);
         res.redirect('/campgrounds');
      }
   });

});

// Render camp form
router.get('/new', isLoggedIn, (req, res) => {
   res.render('campgrounds/new');
});

// GEt Single Campgrounds
router.get('/:id', (req, res) => {
   // find from db using id 
   Campground.findById(req.params.id).populate('comments').exec((error, doc) => {
      if (error) console.log(error);
      else res.render('campgrounds/show', { details: doc });
   })

});

// Show Edit page
router.get('/:id/edit', (req, res) => {
   Campground.findById(req.params.id, (err, campground) => {
      console.log('found campground', campground);
      if (err) throw err;
      res.render('campgrounds/edit', { campground });
   })
});

// Edit Campground
router.put('/:id', (req, res) => {
   const id = req.params.id;
   const UpdatedData = {
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
   }
   Campground.findByIdAndUpdate(id, UpdatedData, { useFindAndModify: false }, (err, campground) => {
      if (err) {
         console.log(err);
         res.redirect(`/campgrounds/${id}/edit`);
      }
      console.log('message updated ', campground);
      res.redirect(`/campgrounds/${id}`);


   })
});

// Delete Campground
router.delete('/:id', (req, res) => {
   const id = req.params.id;

   Campground.findOneAndRemove(id, (err, result) => {
      console.log('message to delete', result);
      if (err) {
         console.log(err);
         res.redirect(`/campgrounds/${id}`);

      }
      res.redirect('/campgrounds');

   })
});
module.exports = router
