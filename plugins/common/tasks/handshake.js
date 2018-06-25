module.exports = function handshake (origin) {
    const std = this.libraries.use('std');
    const entity = std.entities.player.create({
        experience: 0,
        health: {
            now: 100,
            max: 100
        },
        name: 'admin',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        texture: {
            data: null,
            fill: false,
            clip: null
        }
    });

    console.log(std, entity);
};
