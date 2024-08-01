const Account = require('../models/Account.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../../config/redis/redisClient.js');
const Customer = require('../models/Customer.js');
const Staff = require('../models/Staff.js');
const Doctor = require('../models/Doctor.js');
const Admin = require('../models/Admin.js');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

class SiteController {
  // [GET] /
  index(req, res, next) {
    res.send('Welcome to the homepage!');
  }

  // [POST] /signup
  async signUp(req, res, next) {
    try {
      let { username, password, name, phone } = req.body;

      const existAccount = await Account.findOne({ username });
      if (existAccount) {
        return res.status(409).json({
          message: 'User already exists. Please choose a different username.',
        });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      let idAccount;
      while (true) {
        try {
          const lastAccountID = await Account.findOne().sort({ accountID: -1 });
          if (lastAccountID) {
            const lastID = parseInt(lastAccountID.accountID.substring(2));
            idAccount = 'AC' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idAccount = 'AC000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }

      const newAccount = new Account({
        accountID: idAccount,
        username,
        password: hashedPassword,
        status: true,
      });
      await newAccount.save();

      let idCustomer;
      while (true) {
        try {
          const lastCustomerID = await Customer.findOne().sort({
            customerID: -1,
          });
          if (lastCustomerID) {
            const lastID = parseInt(lastCustomerID.customerID.substring(2));
            idCustomer = 'CS' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idCustomer = 'CS000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }

      const newCustomer = new Customer({
        customerID: idCustomer,
        accountID: idAccount,
        name,
        phone,
      });
      await newCustomer.save();

      res.status(201).json({ message: 'Account registered successfully' });
    } catch (error) {
      console.error('Signup Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // [POST] /login
  async logIn(req, res, next) {
    const { username, password } = req.body;
    let deviceIdentifier = req.body.deviceIdentifier;
    if (!deviceIdentifier) {
      return res.status(400).json({ message: 'Device identifier is required' });
    }

    try {
      const account = await Account.findOne({ username });
      if (!account) {
        return res.status(401).json({ message: 'Wrong username or password' });
      }

      const isMatch = await bcrypt.compare(password, account.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Wrong username or password' });
      }

      if (!account.status) {
        return res.status(401).json({ message: 'Account not valid' });
      }

      const token = jwt.sign(
        { id: account._id, username: account.username },
        JWT_SECRET,
        { expiresIn: '3d' },
      );
      const refreshToken = jwt.sign(
        { id: account._id, username: account.username },
        JWT_REFRESH_SECRET,
        { expiresIn: '7d' },
      );

      const redisKey = `refreshToken:${username}:${deviceIdentifier}`;
      await redisClient.set(redisKey, refreshToken, 'EX', 7 * 24 * 60 * 60);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const userToOBj = account.toObject();
      delete userToOBj.password;
      const accountID = userToOBj.accountID;

      const userAgv = await Account.aggregate([
        { $match: { accountID } },
        {
          $lookup: {
            from: 'customers',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'customerDetails',
          },
        },
        {
          $lookup: {
            from: 'staffs',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'staffDetails',
          },
        },
        {
          $lookup: {
            from: 'doctors',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'doctorDetails',
          },
        },
        {
          $lookup: {
            from: 'admins',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'adminDetails',
          },
        },
      ]);
      const user = userAgv[0];
      res.json({ message: 'Login successful', user, token });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // [POST] /refresh
  async requestRefreshToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken;
    const { deviceIdentifier } = req.body;
    if (!deviceIdentifier) {
      return res.status(400).json({ message: 'Device identifier is required' });
    }
    if (!refreshToken) {
      return res.status(401).json({ message: 'You are not authenticated' });
    }
    try {
      jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err, account) => {
        if (err) {
          res.status(403).json('Token is not valid');
        }
        const username = account.username.toString();

        const redisKey = `refreshToken:${username}:${deviceIdentifier}`;
        const result = await redisClient.get(redisKey);

        if (result !== refreshToken) {
          console.error('Refresh token does not match');
          return res
            .status(403)
            .json({ message: 'Refresh token is not valid' });
        }

        const newAccessToken = jwt.sign(
          { id: account._id, username: account.username },
          JWT_SECRET,
          { expiresIn: '3d' },
        );
        const newRefreshToken = jwt.sign(
          { id: account._id, username: account.username },
          JWT_REFRESH_SECRET,
          { expiresIn: '7d' },
        );
        await redisClient.set(
          redisKey,
          newRefreshToken,
          'EX',
          7 * 24 * 60 * 60,
        );
        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ accessToken: newAccessToken });
      });
    } catch (error) {
      console.error('Refresh Token Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  //POST /logout
  async logOut(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const { deviceIdentifier } = req.body;
      jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err, account) => {
        if (err) {
          console.error('JWT verify error:', err);
          return res.status(403).json({ message: 'Token is not valid' });
        }

        const username = account.username.toString();
        const redisKey = `refreshToken:${username}:${deviceIdentifier}`;
        const response = await redisClient.del(redisKey);
        if (response !== 1) {
          console.error('Redis del error');
          return res.status(500).json({ message: 'Logout failed' });
        }

        res.clearCookie('refreshToken');
        return res.status(200).json({ message: 'Logout successful' });
      });
    } catch (error) {
      console.error('Logout Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // GET /checkPhoneSignUp
  async checkPhoneSignUp(req, res, next) {
    const { phone } = req.query;
    try {
      const customer = await Customer.findOne({ phone });
      const staff = await Staff.findOne({ phone });
      const doctor = await Doctor.findOne({ phone });
      const admin = await Admin.findOne({ phone });
      if (customer || staff || doctor || admin) {
        return res.status(200).json({ exists: true });
      }
      res.status(200).json({ exists: false });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new SiteController();
