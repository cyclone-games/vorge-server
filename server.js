const Server = require('./core/Server');

const common = require('./plugins/common');
const postgres = require('./plugins/postgres');

const server = new Server('Title Here', [ common, postgres ]);

server.listen(6969);

console.log(`
       ____    ____   _  ____    ____
      //  \\\\  //  \\\\ // //  \\\\  //  \\\\
     //   // //     // //   // //   //
    //   // //     // //   // //   //
    \\\\__// //     //  \\\\__// //   //

            POWERED BY VORGE
`)
