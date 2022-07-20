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
  console.log(`\nA socket has been connected: \nID: ${socket.id} \nOrigin: ${socket.handshake.headers.origin}`)
  console.log('a user connected');
  socket.on('direction', data => {
    console.log(data)
    socket.broadcast.emit(data)
  })

  socket.on('led', data => {
    console.log(data)
    socket.broadcast.emit(data)
  })

  socket.on('disconnect', data => {
    console.log('a client disconnected')
  })
});

server.listen(PORT, () => {
  console.log('listening on *:' + PORT);
});
