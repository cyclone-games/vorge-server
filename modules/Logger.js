const Module = require('vorge/core/Module');

module.exports = class Logger extends Module {

    constructor (name, game) {
        super(name, game);
    }

    connect (server) {

    }

    error (message) {
        console.error(module.exports.pattern('error', message));
    }

    warn (message) {
        console.warn(module.exports.pattern('warn', message));
    }

    info (message) {
        console.info(module.exports.pattern('info', message));
    }
};

module.exports.pattern = function pattern (type, message) {
    return `[ ${ Date.now() } ] [ ${ type.toUpperCase() } ] ${ message }`;
};
