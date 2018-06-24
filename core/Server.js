const http = require('http');
const uws = require('uws');

const Event = require('vorge/core/Event');

const LibraryManager = require('vorge/modules/LibraryManager');
const Settings = require('vorge/modules/Settings');
const TaskManager = require('vorge/modules/TaskManager');

const Connection = require('../modules/Connection');
const Database = require('../modules/Database');
const FileSystem = require('../modules/FileSystem');
const Logger = require('../modules/Logger');
const Router = require('../modules/Router');
const SessionManager = require('../modules/SessionManager');

module.exports = class Server extends Event.Emitter {

    constructor (name, plugins = [ ]) {
        super(name);

        this.plugins = plugins;

        for (const mod of Object.keys(module.exports)) {
            this[ mod ] = new module.exports[ mod ](mod, this);
        }

        const exclude = [ 'kind', 'plugins', 'observables', 'http', 'uws' ];
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
        this.http = http.createServer((...args) => this.emit('request', args));
        this.uws = new uws.Server({ port, server: this.http });
        this.uws.on('connection', socket => {
            this.emit('connection', [ socket ]);
        });
        this.emit('listen', [ port ]);
    }

    extend (plugin) {
        this.plugins.push(plugin);
    }
};

module.exports.connection = Connection;
module.exports.database = Database;
module.exports.files = FileSystem;
module.exports.libraries = LibraryManager;
module.exports.logger = Logger;
module.exports.router = Router;
module.exports.sessions = SessionManager;
module.exports.settings = Settings;
module.exports.tasks = TaskManager;
