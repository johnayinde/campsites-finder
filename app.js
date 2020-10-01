const app = require('express')(),
    // sedDb = require('./seed'),
    PORT = process.env.PORT || 3000;
require('dotenv').config()

require('./utils/db')()
require('./utils/middleware')(app)

// sedDb();
require('./utils/passport')(app)
require('./utils/routes')(app)


// Running Port
app.listen(PORT, function () {
    console.log(`serving port ${PORT}`)
})
