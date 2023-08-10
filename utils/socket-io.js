let io;
exports.socketConnection = (server) => {
  io = require('socket.io')(server);
};

exports.emit = (message, body) => {
    io.emit(message, body);
}