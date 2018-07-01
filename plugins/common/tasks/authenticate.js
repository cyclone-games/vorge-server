const utilities = require('../utilities');

module.exports = function authenticate ([ username, password ], id) {
    const encrypted = utilities.encrypt(password);

    this.database.execute('authenticate', [ username, encrypted ]).then(result => {
        const [ account ] = result.rows;
        const { username, ...permissions } = account;

        this.sessions.save(id, account);
        this.connection.send(id, { task: { name: 'authorize', details: permissions }, id });
        this.logger.info(`${ username } has joined the server`);
    })
    .catch(error => {
        console.log(error);
    });
};
