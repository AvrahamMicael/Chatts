module.exports = {
  rooms: {},
  messages: {},
  io: server => {
    const { Server } = require('socket.io');
    const io = new Server(server);
    
    io.on('connection', socket => {
      console.log('a user connected');
      socket.on('enterRoom', require('./enterRoom')(socket));
      socket.on('sendMessage', require('./sendMessage')(socket, io));
    });
  },
};
