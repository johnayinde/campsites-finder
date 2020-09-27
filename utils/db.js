const mongoose = require('mongoose')
const url = 'mongodb://localhost/yelp_camp';
module.exports = function () {
    mongoose.connect(url, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true }).then(() => console.log('DB connected'))
        .catch((error) => console.log("DB error"))


}