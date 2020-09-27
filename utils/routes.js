const campgroundRoute = require('../routes/campground'),
    commentRoute = require('../routes/comments'),
    authRoute = require('../routes/auth'),
    usersRoute = require('../routes/users');

module.exports = function (app) {
    // Global Variable for all templates
    app.use((req, res, next) => {
        res.locals.currentUser = req.user;
        res.locals.success = req.flash('success');
        res.locals.error = req.flash('error');
        next();
    })

    // Route Middlewares
    app.use('/campgrounds', campgroundRoute);
    app.use('/users', usersRoute);
    app.use('/', authRoute);
    app.use('/campgrounds/:id/comments', commentRoute);


}