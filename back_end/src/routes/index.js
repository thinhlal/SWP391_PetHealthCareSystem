const siteRouter = require('./site');
const bookingRouter = require('./booking');
const serviceRouter = require('./service');
const paypalRouter = require('./paypal');
const petRouter = require('./pet');
const adminRouter = require('./admin');
const doctorRouter = require('./doctor');
const accountRouter = require('./account');
const manageBookingRouter = require('./manageBooking');
const paymentRouter = require('./payment');
const cageRouter = require('./cage');
const rateRouter = require('./rate');
const userRouter = require('./user');

function route(app) {
  app.use('/user', userRouter);
  app.use('/rate', rateRouter);
  app.use('/cage', cageRouter);
  app.use('/payment', paymentRouter);
  app.use('/manageBooking', manageBookingRouter);
  app.use('/doctor', doctorRouter);
  app.use('/account', accountRouter);
  app.use('/admin', adminRouter);
  app.use('/pet', petRouter);
  app.use('/service', serviceRouter);
  app.use('/paypal', paypalRouter);
  app.use('/booking', bookingRouter);
  app.use('/', siteRouter);
}

module.exports = route;
