const { messages } = require(".");
const sanitizeString = require("../utils/sanitizeString");

module.exports = socket => message => {
  const messageObj = {
    message: sanitizeString(message) || `<mark>This message couldn't be sent</mark>`,
    username: socket.username,
    time: new Date().toISOString(),
  };
  messages[socket.roomCode].push(messageObj);
  return socket.roomEmitAll('newMessage', messageObj);
};
