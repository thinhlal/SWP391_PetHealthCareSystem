const coursesRouter = require('./courses');
const siteRouter = require('./site');

function route(app) {
    app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
}

module.exports = route;
