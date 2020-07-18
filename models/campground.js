const mongoose = require('mongoose');
const Schema = mongoose.Schema

const campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   price: String,
   created: {
      type: Date,
      default: Date.now
   },
   description: String,
   author: {
      id: {
         type: Schema.Types.ObjectId,
         ref: 'User',
      },
      username: String,
   },
   comments: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Comment',
      }
   ]
})

module.exports = mongoose.model('Camp', campgroundSchema);
