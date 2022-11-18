const { rooms, messages } = require(".");
const sanitizeString = require("../utils/sanitizeString");
const attachDataToSocket = require('../utils/attachDataToSocket');

module.exports = (socket, io) => ({ username, roomCode }) => {
  const cleanUsername = sanitizeString(username);

  if(!cleanUsername) return socket.emit('invalidUsername');

  const room = rooms[roomCode] = rooms[roomCode] ?? [];
  if(room.indexOf(cleanUsername) != -1) return socket.emit('sameUsernameInRoom');
  room.push(cleanUsername);
  const roomMessages = messages[roomCode] = messages[roomCode] ?? [];

  socket.join(roomCode);

  attachDataToSocket(socket, io, cleanUsername, roomCode);

  socket.emitConnectionMessage();
  return socket.emit('connectRoom', roomMessages, cleanUsername);
};
