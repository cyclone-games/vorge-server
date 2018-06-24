const util = require('util');

const Module = require('vorge/core/Module');

module.exports = class Database extends Module {

    constructor (name, game) {
        super(name, game);

        this.client = null;
        this.functions = new Map();
    }

    connect (server) {
        server.settings.subscribe('set').filter(m => m.arguments[ 0 ].startsWith('database')).forEach(method => {
            const [ key, value ] = method.arguments;

            switch (true) {
                case key.endsWith('client'): {
                    this.client = value;
                }
            }
        });
    }

    register (name, query) {
        return this.functions.set(name, query);
    }

    execute (name, parameters) {
        return this.functions.get(name)(this.client, parameters).then(result => {
            this.client.release();
            return result;
        });
    }
};
