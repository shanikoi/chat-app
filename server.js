const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

app.use(bodyParser.json());

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await UserModel.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
  });

  await newUser.save();

  res.json({ message: 'User created successfully' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({ token });
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log(`Message: ${msg}`);
    io.emit('chat message', msg);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
