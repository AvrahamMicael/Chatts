const { rooms, messages } = require(".");

module.exports = (socket, io) => ({ username, roomCode }) => {
  const room = rooms[roomCode] = rooms[roomCode] ?? [];
  if(room.indexOf(username) != -1) return socket.emit('sameUsernameInRoom');
  room.push(username);
  const roomMessages = messages[roomCode] = messages[roomCode] ?? [];

  socket.join(roomCode);
  socket.roomCode = roomCode;
  socket.username = username;
  socket.roomEmit = (eventName, ...args) => io.in(roomCode).emit(eventName, ...args);

  return socket.emit('connectRoom', roomMessages, username);
};
