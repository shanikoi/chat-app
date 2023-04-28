const jwt = require('jsonwebtoken');
const User = require('../models/User');

// middleware for user's token auth
async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
}

module.exports = {
  authenticateToken
};
