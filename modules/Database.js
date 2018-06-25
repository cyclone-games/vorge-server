const util = require('util');

const Module = require('../core/Module');

module.exports = class Database extends Module {

    constructor (name, server) {
        super(name, server);

        this.pool = null;
        this.functions = new Map();
    }

    connect (server) {
        server.settings.subscribe('set').filter(m => m.arguments[ 0 ].startsWith('database')).forEach(method => {
            const [ key, value ] = method.arguments;

            switch (true) {
                case key.endsWith('pool'): {
                    this.pool = value;
                }
            }
        });
    }

    register (name, query) {
        return this.functions.set(name, query);
    }

    execute (name, parameters) {
        return this.pool.connect().then(client => {
            return this.functions.get(name)(client, parameters).then(result => {
                client.release();
                return result;
            });
        });
    }
};
