const EndpointTypes = require('../data-description/endpoint-types');
const FlightDataFields = require('../data-description/flight-data-fields');
const Airlines = require('../data-description/airlines');

module.exports = class AirlineClientData{

    constructor(data){
        this.username=data.username;
        this.password=data.password;
        this.triggersIds = data.triggersIds;
        this.filtersIds = data.filtersIds;
        this.validationsIds = data.validationsIds;
        this.setAirline(data.airline)
        this.setRequiredFields(data.requiredFields);
        this.setToken(data.token);
        this.setEndpointType(data.endpointType);
        this.setResponseContentType(data.responseContentType);
    }

    setAirline(airline){
        if(!airline){
            throw new Error("The client system's airline must be specified");
        }
        let allAirlines = Object.keys(Airlines);
        if(!allAirlines.includes(airline.toUpperCase())){
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
            throw new Error('The endpoint type must be specified');
        }
        this.responseContentType = responseContentType;
    }

    setRequiredFields(requiredFields){
        if(!requiredFields){
            throw new Error('The required fields must be specified')
        }
        let allFields = Object.keys(FlightDataFields);
        requiredFields.forEach(field => {
            if(!allFields.includes(field.toUpperCase())){
                throw new Error(`Flight data field '${field}' does not exist`);
            }
        });
        this.requiredFields = requiredFields;
    }
}