const uuidv4 = require('uuid/v4');

const Module = require('vorge/core/Module');

module.exports = class SessionManager extends Module {

    constructor (name, game) {
        super(name, game);

        this.cache = new Map();
    }

    connect (server) {

    }

    save (origin, id) {
        return this.cache.set(origin, id);
    }

    remember (origin) {
        return this.cache.get(origin);
    }

    forget (origin) {
        return this.cache.delete(origin);
    }
}
