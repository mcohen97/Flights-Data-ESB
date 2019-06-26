const AirlineRestClientData = require('./airline-rest-client-data');
const EndpointTypes = require('../data-description/endpoint-types');

module.exports= class AirlineClientDataFactory{ 

    static createClientData(data){
        try{
            return this.tryCreateData(data);
        }catch(error){
            throw new Error('invalid service data');
        }
    }

    static tryCreateData(data){
        let airlineData;
        switch(data.endpointType.toUpperCase()){
            case EndpointTypes.REST_API:
                airlineData= new AirlineRestClientData(data);
                break;
        }
        return airlineData;
    }
}