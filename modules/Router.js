const http = require('http');
const url = require('url');

const fileType = require('file-type');
const jRouter = require('juncture/Router');

const Module = require('../core/Module');

const util = {

    file (status, file) {
        const type = fileType(file);
        const mime = type ? type.mime : 'text/plain';
        const length = Buffer.byteLength(file);

        return {
            status: status,
            headers: {
                'content-type': mime,
                'content-length': length
            },
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
            message: JSON.stringify({ error: `${ code.toString().toLowerCase() } ${ message }` })
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

        response.setHeader('access-control-allow-origin', '*');
        response.setHeader('access-control-allow-headers', 'content-type, content-length, authorization, *');
        response.setHeader('access-control-allow-methods', 'get, post, put, delete, *');
        response.setHeader('access-control-expose-headers', 'content-type, content-length, authorization, *');

        if (request.method.toLowerCase() === 'options') {
            response.end();
        }
        else if (!route) {
            const error = util.error(404, 'Not Found');

            this.server.logger.error(JSON.parse(error.message).error);

            response.writeHead(error.code, error.meta);
            response.end(error.message);
        }

        if (!response.finished) try {
            const result = await route.action.call(this, request, route.params);

            this.server.logger.info(`${ request.method.toLowerCase() } ${ pathname }`);

            response.writeHead(result.status, result.headers);
            response.end(result.body);
        }
        catch (error) {
            const code = Number.parseInt(error.code) || 500;

            this.server.logger.error(JSON.parse(error.message).error);

            response.writeHead(code, error.meta);
            response.end(error.message);
        }
    }
};
