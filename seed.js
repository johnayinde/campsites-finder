const mongoose = require('mongoose');
const Comment = require('./models/comment');
const Campground = require('./models/campground');

const data = [
   { name: "Camp one", image: '/img/fung.jpg', description: "Welcome to my camp grund one" },
   { name: "Camp two", image: '/img/fung.jpg', description: "Welcome to my camp grund two" },
   { name: "Camp three", image: '/img/fung.jpg', description: "Welcome to my camp grund three" },
   { name: "Camp four", image: '/img/fung.jpg', description: "Welcome to my camp grund four" },
];

function seedDb() {
   // remove all campgrounds
   Campground.deleteMany({}, (err) => {
      if (err) throw err;
      console.log('campground removed');

      data.forEach(seed => {
         Campground.create(seed, (err, ground) => {
            if (err) throw err;
            else {
               console.log('campground created');
               Comment.create({ text: 'i love the camp', author: 'James' }, (err, data) => {
                  if (err) throw err;
                  else {
                     ground.comments.push(data._id);
                     ground.save()
                     console.log('comment created');
                  }
               })
            }

         })
      })
   })
}

module.exports = seedDb;