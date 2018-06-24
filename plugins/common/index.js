const Plugin = require('vorge/core/Plugin');

const authorization = require('./middleware/authorization');

const admin = require('./handlers/admin');
const assets = require('./handlers/assets');

const authenticate = require('./tasks/authenticate');
const createAccount = require('./tasks/createAccount');
const handshake = require('./tasks/handshake');

module.exports = new Plugin('common', server => {
    server.router.register('get', '/admin', [ authorization ], admin);
    server.router.register('get', '/assets/{ filename }', [ authorization ], assets);

    server.tasks.subscribe('authenticate').forEach(method => authenticate.apply(server, method.arguments));
    server.tasks.subscribe('createAccount').forEach(method => createAccount.apply(server, method.arguments));
    server.tasks.subscribe('handshake').forEach(method => handshake.apply(server, method.arguments));
});
