// const Account = require('../models/Account.js');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
// const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_jwt_refresh_secret_key';

class BookingController {
  // [GET] /
  index(req, res, next) {
    res.send('Welcome to the BookingPage!');
  }
}

module.exports = new BookingController();
