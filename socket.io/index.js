module.exports = {
  messages: {},
  rooms: {},
};

const enterRoom = require('./enterRoom');
const sendMessage = require('./sendMessage');
const disconnect = require('./disconnect');

module.exports.io = server => {
  const io = new (require('socket.io').Server)(server);
  io.on('connection', socket => {
    console.log('an user connected');
    socket.on('enterRoom', enterRoom(socket, io));
    socket.on('sendMessage', sendMessage(socket));
    socket.on('disconnect', disconnect(socket));
  });
};
