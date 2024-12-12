const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Socket.io server is running!');
});

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',
    // origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for messages from the client
  socket.on('message', (message) => {
    console.log('Received:', message);

    io.emit('message', message)
  });

  // Send a message to the client
  socket.emit('message', 'Hello from the Socket.io server!');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Socket.io server is listening on http://localhost:3000');
});
