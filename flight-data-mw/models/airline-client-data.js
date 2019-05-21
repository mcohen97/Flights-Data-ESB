module.exports = class AirlineClientData{

    constructor(data){
        this.username=data.username;
        this.password=data.password;
        this.token = data.token;
        this.endpointType = data.endpointType;
        this.responseContentType = data.responseContentType;
    }
}