const http = require('http');
const uws = require('uws');

const Event = require('vorge/core/Event');
const Settings = require('vorge/modules/Settings');
const TaskManager = require('vorge/modules/TaskManager');

const Connection = require('../modules/Connection');
const Router = require('../modules/Router');

module.exports = class Server extends Event.Emitter {

    constructor (name, plugins = [ ]) {
        super(name);

        this.plugins = plugins;

        for (const mod of Object.keys(module.exports)) {
            this[ mod ] = new module.exports[ mod ](mod, this);
        }

        const exclude = [ 'kind', 'plugins', 'observables', 'httpServer', 'uwsServer' ];
        const modules = Object.keys(this).filter(key => !exclude.includes(key));

        for (const mod of modules.map(mod => this[ mod ])) {
            mod.connect(this);
        }

        this.refresh();
    }

    refresh (hard) {
        for (const plugin of this.plugins) if (hard || !plugin.applied) {
            plugin.patch(this);
        }
    }

    listen (port) {
        this.httpServer = http.createServer((...args) => this.emit('request', args));
        this.uwsServer = new uws.Server({ port, server: this.httpServer });
        this.uwsServer.on('connection', socket => {
            this.emit('connection', [ socket ]);
        });
    }

    extend (plugin) {
        this.plugins.push(plugin);
    }
};

module.exports.connection = Connection;
module.exports.router = Router;
module.exports.settings = Settings;
module.exports.tasks = TaskManager;
