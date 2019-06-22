const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 6667;

const routes= require('./controllers/router').router;

app.use(bodyParser.json({limit:'999mb', pretty: true }));
app.use(routes);
let server = app.listen(port, function () {

    let host = server.address().address
    let port = server.address().port

    console.log('Listening publicataions at http://%s:%s', host, port)
});

