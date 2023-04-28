const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// new user registration
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    // salt and hash generation using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // new user
    const user = new User({
      username: username,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // find by username
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    // JWT generation and sending to client
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Login successful.', token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
