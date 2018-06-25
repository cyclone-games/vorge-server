const { promisify } = require('util');

module.exports = function authenticate (client, parameters) {
    return new Promise((resolve, reject) => {
        client.query('select id, username from account where username = $1 and password = $2;', parameters, (error, result) => {

            if (error) {
                return reject(error);
            }

            return resolve(result);
        });
    });
};
