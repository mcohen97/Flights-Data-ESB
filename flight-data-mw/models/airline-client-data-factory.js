const AirlineRestClientData = require('./airline-rest-client-data');

module.exports= function createClientData(data){
    let airlineData;
    switch(data.endpointType){
        case 'REST_API':
            airlineData= new AirlineRestClientData(data);
            break;
    }
    return airlineData;
}