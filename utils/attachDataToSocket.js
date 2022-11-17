const { messages } = require("../socket.io");

module.exports = (socket, io, username, roomCode) => {
  const genConnectionMessage = isConnecting => ({
    username,
    message: isConnecting ? 'connected' : 'disconnected',
    time: new Date().toISOString(),
    isConnectionMessage: true,
  });
  socket.roomCode = roomCode;
  socket.username = username;
  socket.roomEmit = (eventName, ...args) => socket.in(roomCode).emit(eventName, ...args);
  socket.roomEmitAll = (eventName, ...args) => io.in(roomCode).emit(eventName, ...args);
  socket.leaveRoom = () => socket.leave(roomCode);
  socket.emitConnectionMessage = (isConnecting = true) => {
    const connectionMessage = genConnectionMessage(isConnecting);
    messages[roomCode].push(connectionMessage);
    socket.roomEmit('connectionNotification', connectionMessage);
  };
};
