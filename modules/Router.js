const http = require('http');
const url = require('url');

const fileType = require('file-type');

const Module = require('vorge/core/Module');
const jRouter = require('juncture/Router');

const util = {

    file (status, file) {
        const type = fileType(file);
        const mime = type ? type.mime : 'text/plain';

        return {
            status: status,
            headers: { 'content-type': mime },
            body: file
        };
    },

    json (status, object) {
        return {
            status: status,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(object)
        };
    },

    error (code, message) {
        return {
            code: code,
            meta: { 'content-type': 'application/json' },
            message: JSON.stringify({ error: `${ code }: ${ message }` })
        };
    }
};

module.exports = class Router extends Module {

    get util () {
        return util;
    }

    constructor (name, server) {
        super(name, server);

        this.juncture = new jRouter();
        this.sockets = [ ];
    }

    connect (server) {
        server.subscribe('request').forEach(method => this.handle(...method.arguments));
    }

    register (method, path, middleware, action) {

        if (Array.isArray(middleware)) {
            this.juncture[ method.toLowerCase() ](path, middleware.map(fn => fn.bind(this)), action.bind(this));
        }
        else if (typeof middleware === 'function') {
            this.juncture[ method.toLowerCase() ](path, middleware.bind(this));
        }
    }

    async handle (request, response) {
        const { pathname } = url.parse(request.url);
        const route = this.juncture.find(request.method, pathname);

        if (route) try {
            const result = await route.action.call(this, request, route.params);

            response.writeHead(result.status, result.headers);
            response.end(result.body);
        }
        catch (error) {
            const code = Number.parseInt(error.code) || 500;

            response.writeHead(code, error.meta);
            response.end(error.message);

            this.game.logger.error(JSON.parse(error.message).error);
        }
        else {
            const error = util.error(404, 'Not Found');

            response.writeHead(error.code, error.meta);
            response.end(error.message);

            this.game.logger.error(JSON.parse(error.message).error);
        }
    }
};
