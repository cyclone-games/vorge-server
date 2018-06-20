const Module = require('vorge/core/Module');

module.exports = class Router extends Module {

    constructor (name, game) {
        super(name, game);

        this.sockets = [ ];
    }

    connect (server) {
        server.subscribe('request').forEach(method => this.route(...method.arguments));
    }

    route (request, response) {
        console.log(request.method, request.url);
    }
}
