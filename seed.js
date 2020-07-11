const mongoose = require('mongoose');
const Comment = require('./models/comment');
const Campground = require('./models/campground');

const data = [
   { name: "Camp one", image: '/img/fung.jpg', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias asperiores quod voluptatem earum eius officia tenetur excepturi quidem possimus cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem modi iste consequuntur alias ad  one" },
   { name: "Camp two", image: '/img/fung.jpg', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias asperiores quod voluptatem earum eius officia tenetur excepturi quidem possimus cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem modi iste consequuntur alias ad  two" },
   { name: "Camp three", image: '/img/fung.jpg', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias asperiores quod voluptatem earum eius officia tenetur excepturi quidem possimus cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem modi iste consequuntur alias ad  three" },
   { name: "Camp four", image: '/img/fung.jpg', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias asperiores quod voluptatem earum eius officia tenetur excepturi quidem possimus cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem modi iste consequuntur alias ad  four" },
];

function seedDb() {
   // remove all campgrounds
   Campground.deleteMany({}, (err) => {
      if (err) throw err;
      console.log('campground removed');

      // data.forEach(seed => {
      //    Campground.create(seed, (err, ground) => {
      //       if (err) throw err;
      //       else {
      //          console.log('campground created');
      //          Comment.create({ text: 'i love the camp  Alias asperiores quod voluptatem earum eius officia tenetur excepturi quidem possimus cumque. Lorem ipsum dolor sit amet cons', author: 'James' }, (err, data) => {
      //             if (err) throw err;
      //             else {
      //                ground.comments.push(data._id);
      //                ground.save()
      //                console.log('comment created');
      //             }
      //          })
      //       }

      //    })
      // })
   })
}

module.exports = seedDb;
