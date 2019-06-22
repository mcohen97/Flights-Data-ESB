const Logger = require('./logger/logger')('log4js');
const logger = new Logger();

module.exports.initServer = async function () {
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    const port = 6666;

    const routes= require('./controllers/router').router;

    app.use(bodyParser.json({limit:'999mb', pretty: true }));
    app.use(routes);

    let server = app.listen(port, function () {

        let host = server.address().address
        let port = server.address().port

        logger.logInfo("app listening");
        console.log('App listening at http://%s:%s', host, port)
    });

    const service = require('./controllers/router').service;
    service.loadPreviousRegisteredClients();
}