const
   mongoose = require('mongoose'),
   passportLocalMongoose = require('passport-local-mongoose'),
   Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({

   username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
   },
   password: {
      type: String,
      required: true,

   },
   email: {
      type: String,
      unique: true,
      trim: true,
      required: true,

   },
   fullname: String,
   isAdmin: {
      type: Boolean,
      default: false,
   },
   avatar: String,
   phone: Number,
   joined: {
      type: Date,
      default: Date.now,

   },
   posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Camp',
   }],


})
userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', userSchema);

