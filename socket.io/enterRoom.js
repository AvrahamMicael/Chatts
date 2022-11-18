const { rooms, messages } = require(".");
const sanitizeString = require("../utils/sanitizeString");
const attachDataToSocket = require('../utils/attachDataToSocket');

module.exports = (socket, io) => ({ username, roomCode }) => {
  const cleanUsername = sanitizeString(username);

  if(!cleanUsername) return socket.emit('invalidUsername', 'Please, provide an username');
  if(cleanUsername.length > 20) return socket.emit('invalidUsername', "Username can't have more than 20 characters");
  
  const room = rooms[roomCode] = rooms[roomCode] ?? [];
  if(room.indexOf(cleanUsername) != -1)
  {
    if(room.length == 0) delete rooms[roomCode];
    return socket.emit('invalidUsername', 'Someone is already using this username in this room');
  }
  room.push(cleanUsername);
  const roomMessages = messages[roomCode] = messages[roomCode] ?? [];

  socket.join(roomCode);

  attachDataToSocket(socket, io, cleanUsername, roomCode);

  socket.emitConnectionMessage();
  return socket.emit('connectRoom', roomMessages, cleanUsername);
};
