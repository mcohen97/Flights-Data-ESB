const AirlineClient = require('./abstract-airline-client-connection');
const Client = require('node-rest-client').Client;

module.exports= class AirlineRestClient extends AirlineClient{

    constructor(clientData){
        super(clientData);
        this.url = clientData.url;
        this.port = clientData.port;
    }

    async send(data){
        let client = new Client();
        let endpoint = `${this.url}:${this.port}`;
        let args = {
            data: data,
            headers: { "Content-Type": getContentTypeHeader(this.responseContentType),
                        "Authorization": `Bearer ${this.token}` }//the token given by the service in registration.
        };
        let req = client.post(endpoint, args, function (received, response) {
        });

        let username = this.username;

        req.on('requestTimeout', function (req) {
            console.log(`Request timeout error while sending to ${username}`);
            req.abort();
        });
         
        req.on('responseTimeout', function (res) {
            console.log(`Response timeout error while sending to ${username}`);
        });
         
        //it's useful to handle request errors to avoid, for example, socket hang up errors on request timeouts
        req.on('error', function (err) {
            console.log(`Request error while sending to ${username}`);
        });
    }
}

function getContentTypeHeader(contentType){
    let value;
    switch(contentType.toUpperCase()){
        case "JSON":
            value = "application/json";
            break;
        case "XML":
            value = "application/xml";
            break;
        default:
            value = "text/plain";
            break;

    }
    return value;
}