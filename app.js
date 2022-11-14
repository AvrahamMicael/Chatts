require('express-async-errors');
const express = require('express');
const app = express();

require('./security')(app);

require('./routes')(app, express);

const server = require('http').createServer(app);
require('./socket.io').io(server);

const port = process.env.PORT || 3000;
server.listen(port, console.log(`Server listening on port ${port}`));
