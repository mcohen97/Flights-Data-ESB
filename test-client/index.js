let express = require('express');
let bodyParser = require('body-parser');
let xmlparser = require('express-xml-bodyparser');
let app = express();
let port = 3009;


app.use(bodyParser.json());
app.use(xmlparser());

let publication_number = 0;
let mwTimeAccum = 0;
let totalTimeAccum = 0;
let mwAverage = 0;
let totalAverage = 0;
let first = true;
let start = 0;
let startMw = 0
let end = 0;

app.post('/', function (req, res) {
    publication_number++;
    console.log("\n");
    console.log("----- PUBLICACION "+publication_number+" -----");
    console.log(req.body);
    let mwTimeDifference = req.body["MW_CHECKOUT_TIMESTAMP"] - req.body["MW_CHECKIN_TIMESTAMP"];
    let totalTime = Date.now() - req.body["PUBLISHER_CHECKOUT_TIMESTAMP"];
    mwTimeAccum += mwTimeDifference;
    totalTimeAccum += totalTime;
    mwAverage = mwTimeAccum/publication_number;
    totalAverage = totalTimeAccum/publication_number;
    if(first){
        start = req.body["PUBLISHER_CHECKOUT_TIMESTAMP"];
        startMw = req.body["MW_CHECKIN_TIMESTAMP"];
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
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6InVzZXJuYW1lIiwiaWF0IjoxNTYxMjMwNDk4fQ.GXRszQ2Hd-E6h9Zo87BC8tcp3bmdvLS_pR6FXY_eRso";

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
            
    headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` }
};

try{
    client.post("http://localhost:6666/register", args, function (data, response) {
        console.log(data);
    });
    /*client.put("http://localhost:6666/update/username", args, function (data, response) {
        console.log(data);
    });*/
}catch(error){

}
