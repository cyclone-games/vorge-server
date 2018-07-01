const _amend = require('vorge/plugins/common/tasks/amend');

module.exports = function amend (components, id) {
    this.connection.broadcast({ task: { name: 'amend', details: components }, id }, id);
    _amend.call(this, components, id);
};
