const AirlineRestClientConnection = require('./airline-rest-client-connection');
const EndpointTypes = require('domain-entities').EndpointTypes;
const TriggerParser = require('domain-entities').TriggerParser;

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

