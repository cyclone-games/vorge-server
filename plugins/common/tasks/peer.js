module.exports = function peer (origin) {
    const std = this.libraries.use('std');

    for (const [ id, entity ] of this.initializer.heap.entities.entries()) if (id !== origin) {
        const peer = std.entities.player.assemble(entity);

        this.connection.send(origin, { task: { name: 'initialize', details: { type: 'entity', spec: peer } }, id });

        setTimeout(() => {
            this.connection.send(origin, { task: { name: 'spawn', details: entity.valueOf() }, id });
        }, 1000 / 60);
    }
};
