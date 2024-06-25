const siteRouter = require('./site');
const bookingRouter = require('./booking');
const serviceRouter = require('./services');
const paypalRoutes = require('./paypal');
const petRoutes = require('./pet');
const manageBookingsRouter = require('./manageBookings');
const doctorRouter = require('./doctor');

function route(app) {
  app.use('/doctor', doctorRouter);
  app.use('/manage-bookings', manageBookingsRouter);
  app.use('/pet', petRoutes);
  app.use('/services', serviceRouter);
  app.use('/paypal', paypalRoutes);
  app.use('/booking', bookingRouter);
  app.use('/', siteRouter);
}

module.exports = route;
