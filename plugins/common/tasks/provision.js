const Entity = require('vorge/core/Entity');

module.exports = function provision (id) {
    const std = this.libraries.use('std');

    const player = this.initializer.spawn(id, {
        id: this.initializer.heap.entities.size,
        kind: std.entities.player.kind,
        components: {
            experience: 0,
            health: {
                now: 100,
                max: 100
            },
            id: this.initializer.heap.entities.size,
            name: 'admin',
            position: {
                x: Math.floor(Math.random() * 1024),
                y: Math.floor(Math.random() * 576),
                z: 0
            },
            size: {
                width: 32,
                height: 64,
            },
            texture: {
                data: null
            }
        }
    });

    this.connection.broadcast({ task: { name: 'initialize', details: { type: 'entity', spec: std.entities.player.assemble(player) } }, id });

    setTimeout(() => {
        this.connection.broadcast({ task: { name: 'spawn', details: player.valueOf() }, id });
    }, 1000 / 60);
};
