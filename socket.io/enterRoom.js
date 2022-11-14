const { rooms, messages } = require(".");

module.exports = socket => ({ username, roomCode }) => {
  socket.username = username;

  const room = rooms[roomCode] = rooms[roomCode] ?? [];
  if(room.indexOf(username) != -1) return socket.emit('sameUsernameInRoom');
  room.push(username);
  const roomMessages = messages[roomCode] = messages[roomCode] ?? [];

  socket.join(roomCode);
  socket.roomCode = roomCode;
  return socket.emit('connectRoom', roomMessages, username);
};
