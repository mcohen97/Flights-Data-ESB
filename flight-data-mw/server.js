
module.exports.initServer = async function () {
    const express = require('express');
    const bodyParser = require('body-parser');
    const jwt = require('express-jwt');
    const Config = require('config');

    const app = express();
    const port = 6666;

    const routes= require('./controllers/router').router;

    const mwsecret  = Config.get('credentials.secret') ;

    app.use(jwt({credentialsRequired: true, secret: mwsecret}).unless({path: [/^\/register/]}));
    app.use(function(err, req, res, next) {
        if(err.name === 'UnauthorizedError') {
          res.status(err.status).send({message:err.message});
          return;
        }
     next();
    });

    app.use(bodyParser.json({limit:'999mb', pretty: true }));
    app.use(routes);

    let server = app.listen(port, function () {

        let host = server.address().address
        let port = server.address().port

        console.log('App listening at http://%s:%s', host, port)
    });

    const service = require('./controllers/router').service;
    service.loadPreviousRegisteredClients();
}