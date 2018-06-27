const Entity = require('vorge/core/Entity');

module.exports = function provision (origin) {
    const std = this.libraries.use('std');

    const player = std.entities.player.create({
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
    });

    this.tasks.create('initialize', { type: 'entity', spec: std.entities.player.assemble(player) }, origin);

    setTimeout(() => {
        this.tasks.create('spawn', player.valueOf(), origin);
    }, 100);
};
