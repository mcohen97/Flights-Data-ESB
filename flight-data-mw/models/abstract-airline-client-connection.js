module.exports= class AirlineClient{

    constructor(clientData){
        this.username=clientData.username;
        this.password=clientData.password;
        this.filtersIds = clientData.filtersIds;
        this.validationsIds = clientData.validationsIds;
        this.airline = clientData.airline;
        this.requestedFields = clientData.requestedFields;
        this.trigger = clientData.trigger;
        this.token = clientData.token;
        this.responseContentType = clientData.responseContentType;
    }

    send(data){
        throw new Error('Not implemented');
    }

    getContentType(){
        throw new Error('Not implemented');
    }

    getTrigger(){
        return this.trigger;
    }

}