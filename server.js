const Server = require('./main/Server');

const server = new Server('Title Here', [ ]);

server.subscribe('connection').forEach(method => {
    server.connection.send([ { "name": "ping", "details": { } } ]);
});

server.tasks.subscribe('ping').forEach(method => {
    const [ details ] = method.arguments;
    console.log(`[ task: ping ] [ ${ Date.now() } ] ${ details }`);
});

server.listen(6969);
