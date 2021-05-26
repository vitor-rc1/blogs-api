const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { secret } = require('./secret.json');

const JWT_MALFORMED = 'jwt malformed';
module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne(decoded.email);

    if (!user) {
      return res.status(401).json({ message: JWT_MALFORMED });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: JWT_MALFORMED });
  }
};