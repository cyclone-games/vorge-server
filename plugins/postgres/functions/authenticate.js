module.exports = function authenticate (client, parameters) {
    return client.query('select id, username from account where username = $1 and password = $2;', parameters);
};
