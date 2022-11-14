const { messages } = require(".");

module.exports = (socket, io) => message => {
  const messageObj = { message, username: socket.username };
  messages[socket.roomCode].push(messageObj);
  io.in(socket.roomCode).emit('newMessage', messageObj);
};
