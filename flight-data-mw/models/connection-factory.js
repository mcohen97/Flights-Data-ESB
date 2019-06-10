const AirlineRestClientConnection = require('./airline-rest-client-connection');
const EndpointTypes = require('../data-description/endpoint-types');
const TriggerParser = require('./trigger-parser');

module.exports = class ConnectionFactory{

    static createConnection(airlineClientData){
    airlineClientData.trigger=TriggerParser.createFunctionFromTriggerExpression(airlineClientData.triggerExpression, airlineClientData.requestedFields);
    let result;
    switch(airlineClientData.endpointType.toUpperCase()){
        case EndpointTypes.REST_API:
            result = new AirlineRestClientConnection(airlineClientData);
        break;
    }
    return result;
}
}

