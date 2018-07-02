const Module = require('vorge/core/Module');

module.exports = class ServerModule extends Module {

    constructor (kind, server) {
        super(kind, server, 'server');
    }
}
