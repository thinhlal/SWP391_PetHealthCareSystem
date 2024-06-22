const siteRouter = require('./site');
const bookingRouter = require('./booking');
const serviceRouter = require('./services');
const paypalRoutes = require('./paypal');

function route(app) {
  app.use('/services', serviceRouter);
  app.use('/paypal', paypalRoutes);
  app.use('/booking', bookingRouter);
  app.use('/', siteRouter);
}

module.exports = route;
