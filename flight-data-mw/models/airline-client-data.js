module.exports = class AirlineClientData{

    constructor(data){
        this.username=data.username;
        this.password=data.password;
        this.triggersIds = data.triggersIds;
        this.filtersIds = data.filtersIds;
        this.validationsIds = data.validationsIds;
        setRequiredFields(data.requiredFields);
        setToken(data.token);
        setEndpointType(data.endpointType);
        setResponseContentType(data.responseContentType);
    }

    setRequiredFields(requiredFields){
        //TODO: agregar validaciones
        this.requiredFields = requiredFields;
    }

    setToken(token){
        //TODO: agregar validaciones
        this.token = token;
    }

    setEndpointType(endpointType){
        //TODO: agregar validaciones
        this.endpointType = endpointType;
    }

    setResponseContentType(responseContentType){
        //TODO: agregar validaciones
        this.responseContentType = responseContentType;
    }
}