const { TIMEOUT } = require("dns");

var app = require("express")();

var http = require("http").createServer(app);

var io = require("socket.io")(3000);

io.attach(http, {
  pigInterval: 1000,
  pingTimeout: 5000,
  cookie: false,
});

io.on("connection", function (socket) {
  console.log("user connected");

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
  socket.on("message", function (msg) {
    console.log("message: " + msg);
  });
  timeout();
});

function timeout() {
  setTimeout(function () {
    io.emit("reply", "A message from server");
    timeout();
  }, 5000);
}

http.listen();