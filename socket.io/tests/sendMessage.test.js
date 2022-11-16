const { expectCt } = require("helmet");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const { messages } = require("..");

describe("SendMessage client event", () => {
  let io, serverSocket, clientSocket;

  beforeAll(done => {
    const server = createServer();
    io = new Server(server);
    server.listen(() => {
      const port = server.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", socket => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("Messages Array added the new message", done => {
    serverSocket.on('sendMessage', message => {
      require('../sendMessage')(serverSocket, io)(message);

      const sentMessage =  messages[serverSocket.roomCode][0];
      expect(sentMessage).toHaveProperty('username', 'testUser');
      expect(sentMessage).toHaveProperty('message', 'a random message');
      expect(sentMessage).toHaveProperty('time');

      done();
    });

    clientSocket.on('connectRoom', () => clientSocket.emit('sendMessage', 'a random message'));
    serverSocket.on('enterRoom', require('../enterRoom')(serverSocket));
    
    clientSocket.emit('enterRoom', { username: 'testUser', roomCode: 'testRoom' });
  });
});
