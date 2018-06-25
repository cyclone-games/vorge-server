const utilities = require('../utilities');

module.exports = function authenticate (origin, [ username, password ]) {
    const encrypted = utilities.encrypt(password);

    this.database.execute('authenticate', [ username, encrypted ]).then(result => {
        const [ account ] = result.rows;
        const { id, username, ...permissions } = account;

        this.sessions.save(origin, account);
        this.tasks.create('authorize', permissions, origin);
        this.logger.info(`${ username } has joined the server`);
    })
    .catch(error => {
        console.log(error);
    });
};
