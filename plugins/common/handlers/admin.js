module.exports = async function admin () {
    return this.util.json(200, '{ "admin": true }');
};
