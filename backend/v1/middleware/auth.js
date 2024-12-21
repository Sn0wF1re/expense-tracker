const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email
  };
  return jwt.sign(payload, secret);
};

const verifyToken = (req, res, next) => {
  const headers = req.headers.authorization;
  const token = headers ? headers.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // decode token
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;
    next();
  });
};
  
module.exports = {
  generateToken,
  verifyToken
};