const router = require('express').Router(),
   Campground = require('../models/campground');

// Get All Campgrounds
router.get('/', (req, res) => {
   console.log('current User', req.user);

   Campground.find({}, (error, result) => {
      if (error) console.log(error);
      else res.render('campgrounds/campground', { campgrounds: result });
   })
});

// Create New Campgrounds
router.post('/', (req, res) => {
   const { name, image, description } = req.body;
   Campground.create({ name, image, description }, (error, result) => {
      if (error) console.log(error);
      else {
         console.log("created: ", result);
         res.redirect('/campgrounds');
      }
   });

});

// Render camp form
router.get('/new', (req, res) => {
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

module.exports = router
