const siteRouter = require('./site');
const bookingRouter = require('./booking');
const serviceRouter = require('./service');
const paypalRouter = require('./paypal');
const petRouter = require('./pet');
const adminRouter = require('./admin');
const doctorRouter = require('./doctor');
const accountRouter = require('./account');

function route(app) {
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
