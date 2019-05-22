const AirlineRestClientData = require('./airline-rest-client-data');
const EndpointTypes = require('../data-description/endpoint-types');

module.exports= function createClientData(data){
    let airlineData;
    switch(data.endpointType){
        case EndpointTypes.REST_API:
            airlineData= new AirlineRestClientData(data);
            break;
    }
    return airlineData;
}