const Module = require('../core/Module');

module.exports = class Logger extends Module {

    constructor (name, server) {
        super(name, server);
    }

    connect (server) {

    }

    error (message) {
        process.stderr.write(module.exports.pattern('error', message));
    }

    warn (message) {
        process.stdout.write(module.exports.pattern('warn', message));
    }

    info (message) {
        process.stdout.write(module.exports.pattern('info', message));
    }

    meta (message) {
        process.stdout.write(module.exports.pattern('meta', message));
    }
};

module.exports.pattern = function pattern (type, message) {
    return `[ ${ Date.now() } ] [ ${ type.toLowerCase() } ] ${ message }\n`;
};
