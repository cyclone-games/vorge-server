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
        socket.onmessage = event => this.emit('message', [ JSON.parse(event.data) ]);
        this.sockets.push(socket);
    }

    send (task) {
        this.sockets.forEach(socket => socket.send(JSON.stringify(task)));
    }
}
