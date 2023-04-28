const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// verifying user credentials and generating JWT if valid
async function authenticateUser(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return { user, token };
}

module.exports = {
  authenticateUser
};
