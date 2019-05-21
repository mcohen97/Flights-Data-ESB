const AirlineRestClientConnection = require('./airline-rest-client-connection');

module.exports = class ConnectionFactory{

    static createConnection(airlineClientData){
    let result;
    switch(airlineClientData.endpointType){
        case 'REST_API':
            result = new AirlineRestClientConnection(airlineClientData);
            console.log(result);
        break;
    }
    return result;
}
}

