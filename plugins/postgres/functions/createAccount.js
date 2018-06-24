module.exports = function createAccount (client, parameters) {
    return client.query('insert into account (username, password) values ($1, $2);', parameters);
};
