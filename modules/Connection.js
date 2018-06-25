const uuidv4 = require('uuid/v4');

const Module = require('../core/Module');

module.exports = class Connection extends Module {

    constructor (name, server) {
        super(name, server);

        this.sockets = new Map();
    }

    connect (server) {
        server.subscribe('connection').forEach(method => this.establish(...method.arguments));
        server.tasks.subscribe('handshake').forEach(method => this.handshake(...method.arguments));
    }

    establish (socket) {
        const origin = uuidv4();

        this.sockets.set(origin, socket);

        socket.on('message', message => this.emit('message', [ JSON.parse(message) ]));
        socket.on('close', () => {
            for (const [ id, connection ] of this.sockets) if (socket === connection) {
                this.sockets.delete(id);
                this.emit('close', [ id ]);
                break;
            }
        });

        this.send(origin, { name: 'handshake', details: { id: origin } });
    }

    handshake (task) {
        this.server.logger.info(`New connection from ${ this.sockets.get(task.id)._socket.remoteAddress }`);
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
