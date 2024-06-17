const siteRouter = require('./site');
const bookingRouter = require('./booking');

function route(app) {
  app.use('/', siteRouter);
  app.use('/booking', bookingRouter);
}

module.exports = route;
