module.exports = (socket, io, username, roomCode) => {
  socket.roomCode = roomCode;
  socket.username = username;
  socket.roomEmit = (eventName, ...args) => socket.in(roomCode).emit(eventName, ...args);
  socket.roomEmitAll = (eventName, ...args) => io.in(roomCode).emit(eventName, ...args);
  socket.genConnectionMessage = () => ({ username, message: 'connected', time: new Date().toISOString(), isConnectionMessage: true });
};
