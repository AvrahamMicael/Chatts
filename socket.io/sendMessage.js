const { messages } = require(".");

module.exports = socket => message => {
  const messageObj = { message, username: socket.username, time: new Date().toISOString() };
  messages[socket.roomCode].push(messageObj);
  socket.roomEmit('newMessage', messageObj);
};
