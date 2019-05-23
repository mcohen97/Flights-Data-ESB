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
        console.log("ENVIANDO...")
        let req = client.post(endpoint, data, function (received, response) {
            console.log(received);
            console.log(response);
        });

        req.on('requestTimeout', function (req) {
            console.log('request has expired');
            req.abort();
        });
         
        req.on('responseTimeout', function (res) {
            console.log('response has expired');
         
        });
         
        //it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
        req.on('error', function (err) {
            console.log('request error');
        });
    }
}