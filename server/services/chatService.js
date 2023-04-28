const Chat = require('../models/Chat');
const Message = require('../models/Message');

// sending message 
async function sendMessage(senderId, receiverId, message) {
  const chat = await Chat.findOrCreate(senderId, receiverId);
  const newMessage = new Message({ senderId, receiverId, message, chatId: chat.id });
  await newMessage.save();
  return newMessage;
}

// get chat history
async function getChatHistory(userId) {
  const chats = await Chat.findByUserId(userId);
  const chatIds = chats.map(chat => chat.id);
  const messages = await Message.find({ chatId: { $in: chatIds } }).sort({ createdAt: 1 });
  return { chats, messages };
}

// updating user status
async function updateUserStatus(userId, status) {
  await User.findByIdAndUpdate(userId, { online: status });
}

module.exports = {
  sendMessage,
  getChatHistory,
  updateUserStatus
};
