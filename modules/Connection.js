const uuidv4 = require('uuid/v4');

const Module = require('vorge/core/Module');

module.exports = class Connection extends Module {

    constructor (name, game) {
        super(name, game);

        this.sockets = new Map();
    }

    connect (server) {
        server.subscribe('connection').forEach(method => this.establish(...method.arguments));
        server.tasks.subscribe('handshake').forEach(method => this.handshake(...method.arguments));
    }

    establish (socket) {
        const origin = uuidv4();

        socket.on('message', message => this.emit('message', [ JSON.parse(message) ]));
        this.sockets.set(origin, socket);

        this.send(origin, { name: 'handshake', details: { id: origin } });
    }

    handshake (task) {
        this.game.logger.info(`New connection from ${ this.sockets.get(task.id)._socket.remoteAddress }`);
    }

    disconnect () {

    }

    send (origin, task) {
        this.sockets.get(origin).send(JSON.stringify({ origin, task }));
    }

    broadcast (task) {
        for (const [ origin, socket ] of this.sockets) {
            socket.send(JSON.stringify({ origin, task }));
        }
    }
}
