const siteRouter = require('./site');
const bookingRouter = require('./booking');
const serviceRouter = require('./services');
const paypalRoutes = require('./paypal');
const petRoutes = require('./pet');

function route(app) {
  app.use('/pet', petRoutes);
  app.use('/services', serviceRouter);
  app.use('/paypal', paypalRoutes);
  app.use('/booking', bookingRouter);
  app.use('/', siteRouter);
}

module.exports = route;
