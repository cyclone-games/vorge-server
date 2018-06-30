const Entity = require('vorge/core/Entity');

module.exports = function provision (origin) {
    const std = this.libraries.use('std');

    this.initializer.spawn({
        id: this.initializer.heap.entities.size,
        kind: std.entities.player.kind,
        components: {
            experience: 0,
            health: {
                now: 100,
                max: 100
            },
            id: origin,
            name: 'admin',
            position: {
                x: Math.floor(Math.random() * 1024),
                y: Math.floor(Math.random() * 576),
                z: 0
            },
            size: {
                width: 32,
                height: 32,
            },
            texture: {
                data: null
            }
        }
    });

    const player = this.initializer.heap.entities.get(this.initializer.heap.entities.size - 1);

    this.connection.broadcast({ task: { name: 'initialize', details: { type: 'entity', spec: std.entities.player.assemble(player) } }, origin });

    setTimeout(() => {
        this.connection.broadcast({ task: { name: 'spawn', details: player.valueOf() }, origin }, origin);
    }, 1000 / 60);
};
