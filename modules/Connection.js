const uuidv4 = require('uuid/v4');

const Module = require('../core/Module');

module.exports = class Connection extends Module {

    constructor (name, server) {
        super(name, server);

        this.sockets = new Map();
    }

    connect (server) {
        server.subscribe('connection').forEach(method => this.establish(...method.arguments));
    }

    establish (socket) {
        const id = uuidv4();

        this.sockets.set(id, socket);

        socket.on('message', message => this.emit('message', [ JSON.parse(message) ]));
        socket.on('close', () => {
            for (const [ id, connection ] of this.sockets) if (socket === connection) {
                this.sockets.delete(id);
                this.emit('close', [ id ]);
                break;
            }
        });

        this.handshake(id);
    }

    handshake (id) {
        this.server.tasks.create('handshake', [ id ], id);
    }

    send (message, origin) {
        this.sockets.get(origin).send(JSON.stringify(message));
    }

    broadcast (message) {
        for (const [ origin, socket ] of this.sockets) {
            socket.send(JSON.stringify(message));
        }
    }
}
