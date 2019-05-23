const Server = require('./server');
const DBContext = require('./repositories/db-context');

(async () => {
    try {
        await DBContext.initRepository();
        await Server.initServer();
    } catch(err) {
        console.log(`Error initializing server: ${err}`);
        process.exit(1);
    }
})();