const { Pool } = require('pg');
const util = require('util');

const Plugin = require('vorge/core/Plugin');

const authenticate = require('./functions/authenticate');
const register = require('./functions/register');

module.exports = new Plugin('postgres', server => {
    server.database.register('authenticate', authenticate);
    server.database.register('register', register);

    server.settings.set('database.pool', new Pool({
        host: 'localhost',
        database: 'orion',
        user: 'admin',
        password: '1234'
    }));
});
