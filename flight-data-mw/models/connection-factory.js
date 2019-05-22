const AirlineRestClientConnection = require('./airline-rest-client-connection');
const EndpointTypes = require('../data-description/endpoint-types');

module.exports = class ConnectionFactory{

    static createConnection(airlineClientData){
    let result;
    switch(airlineClientData.endpointType.toUpperCase()){
        case EndpointTypes.REST_API:
            result = new AirlineRestClientConnection(airlineClientData);
            console.log(result);
        break;
    }
    return result;
}
}

