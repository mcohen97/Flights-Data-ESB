const AirlineClient = require('./airline-client');
const Client = require('node-rest-client').Client;

module.exports= class AirlineClientRest extends AirlineClient{

    constructor(token,url, port, credentials, dataDescription){
    super(token,credentials);
    this.url = url;
    this.port = port;
    this.dataDescription = dataDescription;
    }

    send(data){
        let client = new Client();
        let endpoint = `${this.url}:${this.port}`;
        client.post(endpoint, data, function (received, response) {
            //TODO: pending.
        });
    }
}