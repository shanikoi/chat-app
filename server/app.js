const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// middleware
app.use(express.json());
app.use(cors());

// routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/chats', chatRoutes);

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
