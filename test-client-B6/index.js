let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = 3006;

let endpoints = new Array();

app.use(bodyParser.json());

app.post('/', function (req, res) {
    //req.body.publication.client_checkin_timestamp = Date.now();
    console.log("\n");
    console.log("----- PUBLICACION -----");
    console.log(req.body);
    let mwTimeDifference = req.body["MW_CHECKOUT_TIMESTAMP"] - req.body["MW_CHECKIN_TIMESTAMP"];
    console.log("----- TIME IN MW: "+mwTimeDifference+" -----");
    
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
            airline: 'B6',
            token: 'tokenb6',
            username: 'userb6',
            password: 'userb6',
            requestedFields: [ "FLIGHT_NUMBER","YEAR"],
            filtersIds: ["cancelledToBoolean", "printOnScreen"],
            validationsIds: ["validDate","cancelled0or1"],
            triggerExpression: 'YEAR >= 2014'
        },
            
    headers: { "Content-Type": "application/json" }
};

try{
    client.post("http://localhost:6666/register", args, function (data, response) {
        console.log("\n");
        console.log(data);

    });
}catch(error){

}
