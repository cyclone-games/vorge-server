module.exports = function amend (components, id) {
    const std = this.libraries.use('std');
    const entity = this.initializer.heap.entities.get(id);

    this.connection.broadcast({ task: { name: 'amend', details: components }, id }, id);

    for (const [ key, value ] of  Object.entries(components)) {
        Object.assign(std.components[ key ].of(entity), value);
    }
};
