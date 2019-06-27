let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = 3006;

let endpoints = new Array();

app.use(bodyParser.json());

app.post('/', function (req, res) {
    //req.body.publication.client_checkin_timestamp = Date.now();
    publication_number++;
    console.log("\n");
    console.log("----- PUBLICACION "+publication_number+" -----");
    console.log(req.body);
    let mwTimeDifference = req.body.MW_CHECKOUT_TIMESTAMP - req.body.MW_CHECKIN_TIMESTAMP;
    let totalTime = Date.now() - req.body.PUBLISHER_CHECKOUT_TIMESTAMP;
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
