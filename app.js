const app = require('express')(),
    sedDb = require('./seed');

require('./utils/db')()
require('./utils/middleware')(app)

// sedDb();
require('./utils/passport')(app)
require('./utils/routes')(app)


// Running Port
app.listen(3000, function () {
    console.log('serving port 3000')
})
