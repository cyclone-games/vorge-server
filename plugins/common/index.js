const Plugin = require('vorge/core/Plugin');

const authorization = require('./middleware/authorization');

const admin = require('./handlers/admin');
const assets = require('./handlers/assets');

const authenticate = require('./tasks/authenticate');
const register = require('./tasks/register');
const provision = require('./tasks/provision');

module.exports = new Plugin('common', server => {
    server.router.register('get', '/admin', [ authorization ], admin);
    server.router.register('get', '/assets/{ filename }', [ authorization ], assets);

    server.tasks.subscribe('authenticate').forEach(method => authenticate.apply(server, method.arguments));
    server.tasks.subscribe('register').forEach(method => register.apply(server, method.arguments));
    server.tasks.subscribe('provision').forEach(method => provision.apply(server, method.arguments));
});
