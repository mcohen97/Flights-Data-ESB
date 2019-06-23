let express = require('express');
let bodyParser = require('body-parser');
let xmlparser = require('express-xml-bodyparser');
//let xmlparser = require('xml2js');
let app = express();
let port = 3004;


app.use(bodyParser.json());
app.use(xmlparser());

let publication_number = 1;

app.post('/', function (req, res) {
    console.log("\n");
    console.log("----- PUBLICACION "+publication_number+" -----");
    publication_number++;
    console.log(req.body);
    let mwTimeDifference = req.body["MW_CHECKOUT_TIMESTAMP"] - req.body["MW_CHECKIN_TIMESTAMP"];
    let totalTime = Date.now() - req.body["PUBLISHER_CHECKOUT_TIMESTAMP"];
    console.log("----- TIME IN MW: "+mwTimeDifference+" -----");
    console.log("----- TOTAL TIME: "+totalTime+" -----");
    
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
            token: 'token',
            username: 'username',
            password: 'password',
            requestedFields: ["FLIGHT_NUMBER","YEAR","CANCELLED"],
            filtersIds: ["cancelledToBoolean", "printOnScreen"],
            validationsIds: ["validDate","cancelled0or1"],
            triggerExpression: 'YEAR >= 2015'

        },
            
    headers: { "Content-Type": "application/json" }
};

try{
    client.post("http://localhost:6666/register", args, function (data, response) {
        console.log(data);
    });
}catch(error){

}
