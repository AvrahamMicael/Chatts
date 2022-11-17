const { rooms, messages } = require(".");

module.exports = socket => () => {
  console.log('an user disconnected');
  if(socket.roomCode === undefined) return;

  const room = rooms[socket.roomCode];
  room.splice(room.indexOf(socket.username), 1);
  if(room.length == 0)
  {
    delete messages[socket.roomCode];
    delete rooms[socket.roomCode];
  }
  else socket.emitConnectionMessage(false);
  return socket.leaveRoom();
};
