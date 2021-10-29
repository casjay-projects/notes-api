const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/key');

// creating a custom middleware for protected route

module.exports = (req, res, next) => {
  const token = req.header('auth-token') || req.header('Bearer');
  if (!token) return res.status(401).send('Access Denied ');

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};
