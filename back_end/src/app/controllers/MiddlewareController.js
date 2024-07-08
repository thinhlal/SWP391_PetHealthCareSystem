const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
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

module.exports = { verifyToken };
