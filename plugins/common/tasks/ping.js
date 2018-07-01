module.exports = function ping (time, id) {
    this.connection.send(id, { task: { name: 'pong', details: time }, id });
};
