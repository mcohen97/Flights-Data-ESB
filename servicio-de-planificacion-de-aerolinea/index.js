let express = require('express');
let bodyParser = require('body-parser');
let xmlparser = require('express-xml-bodyparser');
let app = express();
let port = 3005;


app.use(bodyParser.json());
app.use(xmlparser());


app.post('/', function (req, res) {
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
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6InVzZXJuYW1lIiwiaWF0IjoxNTYxMjMwNDk4fQ.GXRszQ2Hd-E6h9Zo87BC8tcp3bmdvLS_pR6FXY_eRso";

var args = {
    data :{ endpointType: 'REST_API',
            url: 'http://localhost',
            port: port,
            airline: 'AA',
            token: 'token',
            username: 'admin',
            password: 'admin',
            requestedFields: ["FLIGHT_NUMBER","ORIGIN_AIRPORT","DESTINATION_AIRPORT","SCHEDULED_DEPARTURE",
            "DEPARTURE_DELAY","DEPARTURE_TIME","SCHEDULED_ARRIVAL","ARRIVAL_TIME","DELAY_REASON"],
            filtersIds: ["createDateField", "giveDelayReason"],
            validationsIds: ["validDate","departureDelayAndTimeNotEmpty"],
            triggerExpression: 'DEPARTURE_DELAY >= -10 and DEPARTURE_DELAY <= 10'

        },
            
    headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` }
};

try{
    client.post("http://localhost:6666/register", args, function (data, response) {
        console.log(data);
    });
    /*client.put("http://localhost:6666/update/admin", args, function (data, response) {
        console.log(data);
    });*/
}catch(error){

}
