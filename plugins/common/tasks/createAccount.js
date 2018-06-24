const utilities = require('../utilities');

module.exports = function createAccount (origin, [ username, password ]) {
    const encrypted = utilities.encrypt(password);

    this.database.execute('createAccount', [ username, encrypted ]).then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
}
