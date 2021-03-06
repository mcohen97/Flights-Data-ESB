global.Promise = require('bluebird');
const Server = require('./server');
const DBContext = require('repositories').DBContext;


(async () => {
    try {
        await DBContext.initRepository();
        await Server.initServer();
    } catch(err) {
        console.log(`Error initializing server: ${err}, CallStack: ${err.stack}`);
        process.exit(1);
    }
})();