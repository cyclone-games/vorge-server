const { Server } = require('uws');

function main (socket, message) {
    console.log(message);
}

new Server({ port: 6969 }).on('connection', socket => {
    socket.on('message', message => main(socket, message));
    socket.send(`[ { "name": "test", "details": "Admin has joined the server." } ]`);
});
