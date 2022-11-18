const { messages } = require("../socket.io");
const genConnectionMessage = require('./genConnectionMessage');

module.exports = (socket, io, username, roomCode) => {
  socket.roomCode = roomCode;
  socket.username = username;
  socket.roomEmit = (eventName, ...args) => socket.in(roomCode).emit(eventName, ...args);
  socket.roomEmitAll = (eventName, ...args) => io.in(roomCode).emit(eventName, ...args);
  socket.leaveRoom = () => socket.leave(roomCode);
  socket.emitConnectionMessage = (isConnecting = true) => {
    const connectionMessage = genConnectionMessage(username, isConnecting);
    messages[roomCode].push(connectionMessage);
    socket.roomEmit('connectionNotification', connectionMessage);
  };
};
