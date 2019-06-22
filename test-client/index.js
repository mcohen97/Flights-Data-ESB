let express = require('express');
let bodyParser = require('body-parser');
let xmlparser = require('express-xml-bodyparser');
//let xmlparser = require('xml2js');
let app = express();
let port = 3004;


app.use(bodyParser.json());
app.use(xmlparser());


app.post('/', function (req, res) {
    //req.body.publication.client_checkin_timestamp = Date.now();
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
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6InVzZXJuYW1lIiwiaWF0IjoxNTYxMjMwNDk4fQ.GXRszQ2Hd-E6h9Zo87BC8tcp3bmdvLS_pR6FXY_eRso";

var args = {
    data :{ endpointType: 'REST_API',
            url: 'http://localhost',
            port: port,
            airline: 'AA',
            token: 'token',
            username: 'username',
            password: 'password',
            requestedFields: ["YEAR","CANCELLED","DAY", "MONTH"],
            filtersIds: ["cancelledToBoolean", "printOnScreen"],
            validationsIds: ["validDate","cancelled0or1"],
            triggerExpression: 'YEAR > 2015'

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
