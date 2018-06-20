const Mock = require('fenrir/core/Mock');
const Specification = require('fenrir/core/Specification');
const Spy = require('fenrir/core/Spy');

const Connection = require('../../modules/Connection');
const Server = require('../../core/Server');

module.exports = new Specification('Connection', test => {
    const server = new Mock(Server);
    const connection = new Connection();
    
    connection.connect(server);
    
    test.case('connections should exist as an array on this.sockets').run(expect => {
        expect(Array.isArray(connection.sockets));
    });
    
    test.case('upon connection, should save socket via this.establish').run(expect => {
        const socket = new Spy();
        
        server.emit('connection', [ socket ]);
        
        expect(Spy.called(socket.on));
        expect(connection.sockets.includes(socket));
    });
    
    test.case('connection should allow sending messages as JSON to sockets').run(expect => {
        const socket = new Spy();
        
        connection.sockets = [ socket ];
        connection.send([ { name: 'foo' } ]);
        
        expect(Spy.called(socket.send));
    });
});
