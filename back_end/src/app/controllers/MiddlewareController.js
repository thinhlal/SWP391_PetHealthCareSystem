const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const MiddlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      // Bearer token...
      const accessToken = token.split(' ')[1];
      jwt.verify(accessToken, JWT_SECRET, (err, user) => {
        if (err) {
          res.status(403).json('Token is not valid');
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json('You are not authenticated');
    }
  },

  verifyTokenAndAdminAuth: (req, res, next) => {
    MiddlewareController.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.admin) {
        next();
      } else {
        res.status(403).json('You are not allowed to delete others');
      }
    });
  },
};

module.exports = MiddlewareController;
