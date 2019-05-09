const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 6666;

const routes = require('./controllers/router');


app.use(bodyParser.json({ pretty: true }));
app.use(routes);

let server = app.listen(port, function () {

    let host = server.address().address
    let port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

});