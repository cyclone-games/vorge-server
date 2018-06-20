const Mock = require('fenrir/core/Mock');
const Specification = require('fenrir/core/Specification');
const Spy = require('fenrir/core/Spy');

const Connection = require('../../modules/Connection');
const Server = require('../../core/Server');

module.exports = new Specification('Connection', test => {
    const server = new Mock(Server);
    const connection = new Connection('connection', server);
    
    connection.connect(server);
    
    test.case('connections should exist as an array on this.sockets', () => {
        test.expect(Array.isArray(connection.sockets));
    });
    
    test.case('upon connection, should save socket via this.establish', () => {
        const socket = new Spy();
        
        server.emit('connection', [ socket ]);
        
        test.expect(test.called(socket.on));
        test.expect(connection.sockets.includes(socket));
    });
    
    test.case('should allow sending messages as JSON to connections', () => {
        const socket = new Spy();
        const tasks = [ { name: 'foo' } ];
        
        connection.sockets = [ socket ];
        connection.send(tasks);
        
        test.expect(test.called(socket.send).with(JSON.stringify(tasks)));
    });
});
