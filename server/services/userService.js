const bcrypt = require('bcrypt');
const User = require('../models/User');

// creating new user
async function createUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  return newUser;
}

// getting user profile 
async function getUserProfile(userId) {
  const user = await User.findById(userId);
  return user;
}

// updating user profile
async function updateUserProfile(userId, name, email) {
  const user = await User.findByIdAndUpdate(userId, { name, email });
  return user;
}

// deleting user
async function deleteUser(userId) {
  await User.findByIdAndDelete(userId);
}

module.exports = {
  createUser,
  getUserProfile,
  updateUserProfile,
  deleteUser
};
