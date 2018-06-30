module.exports = function peer (origin) {
    const std = this.libraries.use('std');
    const { id } = std.components;

    for (const [ , entity ] of this.initializer.heap.entities.entries()) if (id.of(entity) !== origin) {
        const peer = std.entities.player.assemble(entity);

        this.tasks.create('initialize', { type: 'entity', spec: peer }, origin);

        setTimeout(() => {
            this.tasks.create('spawn', entity.valueOf(), origin);
        }, 1000 / 60);
    }
};
