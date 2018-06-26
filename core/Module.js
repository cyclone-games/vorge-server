const Module = require('vorge/core/Module');

module.exports = class ServerModule extends Module {

    constructor (kind, game) {
        super(kind, game);
        delete this.game;
        this.server = game;
    }
}
