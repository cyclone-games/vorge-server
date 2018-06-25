const uuidv4 = require('uuid/v4');

const Module = require('../core/Module');

module.exports = class SessionManager extends Module {

    constructor (name, server) {
        super(name, server);

        this.cache = new Map();
    }

    connect (server) {
        server.connection.subscribe('disconnect').forEach(method => this.forget(...arguments));
    }

    save (origin, account) {
        return this.cache.set(origin, account);
    }

    remember (origin) {
        return this.cache.get(origin);
    }

    forget (origin) {
        return this.cache.delete(origin);
    }
}
