const EndpointTypes = require('../data-description/endpoint-types');
const FlightDataFields = require('../data-description/flight-data-fields').List;
const AirlinesIATACodes = require('../data-description/airlines').Codes;
const TriggerExpressionParser = require('./trigger-parser');

module.exports = class AirlineClientData{

    constructor(data){
        this.username=data.username;
        this.password=data.password;
        this.filtersIds = data.filtersIds || [];
        this.validationsIds = data.validationsIds || [];
        this.setAirline(data.airline)
        this.setRequestedFields(data.requestedFields);
        this.setTriggerExpression(data.triggerExpression);
        this.setToken(data.token);
        this.setEndpointType(data.endpointType);
        this.setResponseContentType(data.responseContentType);
    }

    setTriggerExpression(triggerExpression){
        this.triggerExpression = TriggerExpressionParser.formatTriggerExpression(triggerExpression);
    }

    setAirline(airline){
        if(!airline){
            throw new Error("The client system's airline must be specified");
        }
        if(!AirlinesIATACodes.includes(airline.toUpperCase())){
            throw new Error(`Airline '${airline}' does not exist`);
        }
  
        this.airline = airline;
    }

    setToken(token){
        if(!token){
            throw new Error("The client's authentication token must be specified");
        }
        this.token = token;
    }

    setEndpointType(endpointType){
        if(!endpointType){
            throw new Error('The endpoint type must be specified');
        }
        let allTypes = Object.keys(EndpointTypes);
        if(!allTypes.includes(endpointType.toUpperCase())){
            throw new Error(`Endpoint type '${endpointType}' does not exist`);
        }
        this.endpointType = endpointType;
    }

    setResponseContentType(responseContentType){
        if(!responseContentType){
            throw new Error('The responce content type must be specified');
        }
        this.responseContentType = responseContentType;
    }

    setRequestedFields(requestedFields){
        if(!requestedFields){
            throw new Error('The requested fields must be specified')
        }
        /*requestedFields.forEach(field => {
            if(!FlightDataFields.includes(field.toUpperCase())){
                throw new Error(`Flight data field '${field}' does not exist`);
            }
        });*/
        this.requestedFields = requestedFields;
    }
}