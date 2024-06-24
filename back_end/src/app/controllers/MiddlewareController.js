const jwt = require('jsonwebtoken');
const User = require('../models/Account');

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    // Bearer token...
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json('Token expired');
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(403).json('You are not authenticated');
  }
};

const checkRole = roles => async (req, res, next) => {
  try {
    const accountID = req.body.idToCheckRole;
    const user = await User.findOne({ accountID });
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (!roles.includes(user.role)) {
      return res.status(403).send('Access Denied');
    }
    next();
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { verifyToken, checkRole };
