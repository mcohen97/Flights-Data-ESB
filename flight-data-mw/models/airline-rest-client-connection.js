const AirlineClient = require('./airline-client-connection');
const Client = require('node-rest-client').Client;

module.exports= class AirlineClientRest extends AirlineClient{

    constructor(clientData){
        super(clientData);
        this.url = clientData.url;
        this.port = clientData.port;
    }

    send(data){
        let client = new Client();
        let endpoint = `${this.url}:${this.port}`;
        client.post(endpoint, data, function (received, response) {
            //TODO: pending.
        });
    }
}