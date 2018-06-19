const { Server: WebSocketServer } = require('uws');

const Event = require('vorge/core/Event');

const Settings = require('vorge/modules/Settings');
const TaskManager = require('vorge/modules/TaskManager');

const Connection = require('../modules/Connection');

module.exports = class Server extends Event.Emitter {

    constructor (name, plugins = [ ]) {
        super(name);

        this.plugins = plugins;

        for (const module of Object.keys(Server)) {
            this[ module ] = new Server[ module ](module, this);
        }

        const exclude = [ 'kind', 'plugins', 'observables' ];
        const modules = Object.keys(this).filter(key => !exclude.includes(key));

        for (const module of modules.map(module => this[ module ])) {
            module.connect(this);
        }

        this.refresh();
    }

    refresh (hard) {
        for (const plugin of this.plugins) if (hard || !plugin.applied) {
            plugin.patch(this);
        }
    }

    listen (port) {
        this.server = new WebSocketServer({ port });
        this.server.on('connection', socket => {
            this.emit('connection', [ socket ]);
        });
    }

    extend (plugin) {
        this.plugins.push(plugin);
    }
};

module.exports.connection = Connection;
module.exports.settings = Settings;
module.exports.tasks = TaskManager;
