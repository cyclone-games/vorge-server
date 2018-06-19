const Module = require('vorge/core/Module');

module.exports = class Connection extends Module {

    constructor (name, game) {
        super(name, game);

        this.sockets = [ ];
    }

    connect (server) {
        server.subscribe('connection').forEach(method => this.establish(method.arguments[ 0 ]));
    }

    establish (socket) {
        console.log('PLAYER CONNECTED')
        socket.on('message', message => this.emit('message', [ JSON.parse(message) ]));
        this.sockets.push(socket);
    }

    send (tasks) {
        this.sockets.forEach(socket => socket.send(JSON.stringify(tasks)));
    }
}
