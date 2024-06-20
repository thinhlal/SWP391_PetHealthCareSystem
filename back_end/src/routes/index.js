const siteRouter = require('./site');
const bookingRouter = require('./booking');
const serviceRouter = require('./services');

function route(app) {
  app.use('/services', serviceRouter);
  app.use('/booking', bookingRouter);
  app.use('/', siteRouter);
}

module.exports = route;
