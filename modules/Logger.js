const Module = require('../core/Module');

class Logger extends Module {

    constructor (name, server) {
        super(name, server);
    }

    connect (server) {

    }

    error (message) {
        process.stderr.write(Logger.pattern('error', message));
    }

    warn (message) {
        process.stdout.write(Logger.pattern('warn', message));
    }

    info (message) {
        process.stdout.write(Logger.pattern('info', message));
    }

    meta (message) {
        process.stdout.write(Logger.pattern('meta', message));
    }
};

Logger.pattern = function pattern (type, message) {
    return `[ ${ Date.now() } ] [ ${ type.toLowerCase() } ] ${ message }\n`;
};

module.exports = Logger;
