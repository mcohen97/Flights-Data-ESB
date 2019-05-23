let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = 3003;

let endpoints = new Array();

app.use(bodyParser.json());

app.post('/', function (req, res) {
    req.body.publication.client_checkin_timestamp = Date.now();
    console.log(req.body);

    res.status(200);
    res.json({
        message: 'ok got response!'
    });
});

var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

});



var Client = require('node-rest-client').Client;
 
var client = new Client();
 

var args = {
    data :{ endpointType: 'REST_API',
            url: 'http://localhost',
            port: port,
            airline: 'AA',
            token: 'richard',
            username: 'admin',
            password: 'admin',
            requiredFields: ["YEAR"]},
    headers: { "Content-Type": "application/json" }
};

try{
    client.post("http://localhost:6666/register", args, function (data, response) {
        // parsed response body as js object
        //console.log("llego dato");
        console.log(data);
    });
}catch(error){

}
