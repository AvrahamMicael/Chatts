module.exports = {
  rooms: {},
  messages: {},
  io: server => {
    const io = new (require('socket.io').Server)(server);
    
    io.on('connection', socket => {
      console.log('an user connected');
      socket.on('enterRoom', require('./enterRoom')(socket, io));
      socket.on('sendMessage', require('./sendMessage')(socket));
    });
  },
};
