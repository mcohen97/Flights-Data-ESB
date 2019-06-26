let express = require('express');
let bodyParser = require('body-parser');
let xmlparser = require('express-xml-bodyparser');
let app = express();
let port = 3005;

let publication_number = 0;
let mwTimeAccum = 0;
let totalTimeAccum = 0;
let mwAverage = 0;
let totalAverage = 0;
let first = true;
let start = 0;
let startMw = 0
let end = 0;


app.use(bodyParser.json());
app.use(xmlparser());
app.post('/', function (req, res) {
    testing(req);

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
            requestedFields: ["DATE","AIRLINE","FLIGHT_NUMBER","ORIGIN_AIRPORT","DESTINATION_AIRPORT","SCHEDULED_DEPARTURE",
            "DEPARTURE_DELAY","DEPARTURE_TIME","SCHEDULED_ARRIVAL","ARRIVAL_TIME","DELAY_REASON"],
            filtersIds: ["createDateField", "giveDelayReason"],
            validationsIds: ["validDate","departureDelayAndTimeNotEmpty"],
            triggerExpression: 'DEPARTURE_DELAY >= -10 and DEPARTURE_DELAY <= 10'

        },
            
    headers: { "Content-Type": "application/json",
                //"Accept": "application/xml",
                "Authorization": `Bearer ${token}` }
};

try{
    client.post("http://localhost:6666/register", args, function (data, response) {
        console.log(data);
    });
     /*  client.put("http://localhost:6666/update/admin", args, function (data, response) {
        console.log(data);
    });*/
}catch(error){

}

function testing(req){
    publication_number++;
    console.log("\n");
    console.log("----- PUBLICACION "+publication_number+" -----");
    console.log(req.body);
    let mwTimeDifference = req.body.mw_checkout_timestamp - req.body.mw_checkin_timestamp;
    let totalTime = Date.now() - req.body["publisher_checkout_timestamp"];
    mwTimeAccum += mwTimeDifference;
    totalTimeAccum += totalTime;
    mwAverage = mwTimeAccum/publication_number;
    totalAverage = totalTimeAccum/publication_number;
    if(first){
        start = req.body.publisher_checkout_timestamp;
        startMw = req.body.mw_checkin_timestamp;
        first = false;
    }
    end = Date.now();
    let timeFromFirstMw = end - startMw;
    let timeFromFirst = end - start;


    console.log("----- TIME IN MW: "+mwTimeDifference+" | AVERAGE: "+mwAverage);
    console.log("----- TOTAL TIME: "+totalTime+" | AVERAGE: "+totalAverage);
    console.log("----- TOTAL TIME FROM FIRST TO LAST: "+timeFromFirst+" | AVERAGE: "+timeFromFirst/publication_number);
    console.log("----- TOTAL TIME FROM FIRST TO LAST MW: "+timeFromFirstMw+" | AVERAGE: "+timeFromFirstMw/publication_number);
}
