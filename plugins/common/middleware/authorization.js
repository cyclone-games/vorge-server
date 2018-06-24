const url = require('url');

module.exports = async function authorization (request) {
    const { pathname } = url.parse(request.url);
    const { authorization = 'token null' } = request.headers;
    const [ , token ] = authorization.trim().match(/^token (.+?)$/i);
    const player = this.game.sessions.remember(token);

    return; // TODO

    if (!player) {
        throw this.util.error(401, 'Unauthorized');
    }

    if (/^\/admin/.test(pathname) && !player.admin) {
        throw this.util.error(401, 'Unauthorized');
    }
};
