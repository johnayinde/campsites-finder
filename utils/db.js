const mongoose = require('mongoose')
// const url = 'mongodb://localhost/yelp_camp';
const db = 'mongodb+srv://campground:campground@cluster0.8croi.mongodb.net/campground?retryWrites=true&w=majority';


module.exports = function () {
    mongoose.connect(db, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true }).then(() => console.log('DB connected'))
        .catch((error) => console.log("DB error", error))


}