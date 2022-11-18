const { messages } = require(".");
const createMessageObj = require("../utils/createMessageObj");
const sanitizeString = require("../utils/sanitizeString");

module.exports = socket => userMessage => {
  const message = sanitizeString(userMessage);
  if(!message) return;
  const messageObj = createMessageObj(socket.username, message);
  messages[socket.roomCode].push(messageObj);
  return socket.roomEmitAll('newMessage', messageObj);
};
