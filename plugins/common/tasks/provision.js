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
            x: 0,
            y: 0,
            z: 0
        },
        size: {
            width: 32,
            height: 32,
        },
        texture: {
            data: null,
            fill: false,
            clip: null
        }
    });

    this.tasks.create('initialize', { type: 'entity', spec: std.entities.player.assemble(player) }, origin);
    this.tasks.create('initialize', { type: 'script', spec: { name: 'test', code: 'console.log(target, game);' } }, origin);
    setTimeout(() => {
        this.tasks.create('runScript', { target: player, name: 'test' }, origin);
    }, 100);
};
