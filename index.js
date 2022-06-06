const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('direction', data => {
    console.log(data)
    socket.broadcast.emit(data)
  })

  socket.on('disconnect', data => {
    console.log('client connected')
  })
});

server.listen(PORT, () => {
  console.log('listening on *:3000');
});
