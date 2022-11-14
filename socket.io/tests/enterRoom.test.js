const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const { rooms, messages } = require("..");

const usersData = [
  { username: 'username1', roomCode: '1' },
  { username: 'username2', roomCode: '1' },
  { username: 'username3', roomCode: '2' },
  { username: 'username4', roomCode: '2' },
  { username: 'username5', roomCode: '3' },
];

describe("EnterRoom client event", () => {
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

  test.each(usersData)("User send username & roomCode", (userData, done) => {
    serverSocket.on('enterRoom', payload => {
      require('../enterRoom')(serverSocket)(payload);

      const { username, roomCode } = payload;
      expect(rooms[roomCode]).toContain(username);
      expect(messages[roomCode]).toStrictEqual([]);

      done();
    });
    
    clientSocket.emit('enterRoom', userData);
  });
});
