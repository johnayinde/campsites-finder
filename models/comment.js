const mongoose = require('mongoose');
const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
   text: {
      type: String,
   },
   created: {
      type: Date,
      default: Date.now
   },
   author: {
      id: {
         type: Schema.Types.ObjectId,
         ref: 'User'
      },
      username: String
   }
})

module.exports = mongoose.model('Comment', commentSchema);