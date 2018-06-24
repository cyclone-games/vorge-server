const url = require('url');

module.exports = async function authorization (request) {
    const { pathname } = url.parse(request.url);
    const { authorization = 'connection null' } = request.headers;
    const [ , id ] = authorization.trim().match(/^connection (.+?)$/i);
    const player = this.game.sessions.remember(id);

    console.log(id, player);

    return; // TODO

    if (!player) {
        throw this.util.error(401, 'Unauthorized');
    }

    if (/^\/admin/.test(pathname) && !player.admin) {
        throw this.util.error(401, 'Unauthorized');
    }
};
