const fs = require('fs');
const path = require('path');
const util = require('util');

module.exports = async function assets (request, { filename }) {
    try {
        const location = path.join(process.cwd(), 'assets', filename);
        const file = await (util.promisify(fs.readFile)(location));

        return this.util.file(200, file);
    }
    catch (error) {
        this.server.logger.error(error.message);
        throw this.util.error(404, 'Not Found');
    }
};
