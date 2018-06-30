module.exports = function amend (entity, origin) {
    this.connection.broadcast({ task: { name: 'amend', details: entity }, origin }, origin);
};
