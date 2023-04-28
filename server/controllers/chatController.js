const Message = require('../models/message');

// get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get messages between the users
exports.getMessagesBetweenUsers = async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    const messages = await Message.find({
      $or: [
        { fromUser: user1, toUser: user2 },
        { fromUser: user2, toUser: user1 }
      ]
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// send a new message
exports.sendMessage = async (req, res) => {
  try {
    const { fromUser, toUser, content } = req.body;
    const message = new Message({
      fromUser: fromUser,
      toUser: toUser,
      content: content
    });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
