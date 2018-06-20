const Specification = require('fenrir/core/Specification');

const Connection = require('../../modules/Connection');
const Server = require('../../core/Server');

module.exports = new Specification('Connection', test => {
    const server = test.mock(Server);
    const connection = new Connection();
    
    connection.connect(server);
    
    test.case('connections should exist as an array on this.sockets').run(expect => {
        expect(Array.isArray(connection.sockets));
    });
    
    test.case('upon connection, should save socket via this.establish').run(expect => {
        const socket = test.spy();
        
        server.emit('connection', [ socket ]);
        
        expect(test.spy.called(socket.on));
        expect(connection.sockets.includes(socket));
    });
    
    test.case('connection should allow sending messages as JSON to sockets').run(expect => {
        const socket = test.spy();
        
        connection.sockets = [ socket ];
        connection.send([ { name: 'foo' } ]);
        
        expect(test.spy.called(socket.send));
    });
});
