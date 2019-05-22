module.exports= class AirlineClient{

    constructor(clientData){
        this.data= clientData.token;
        this.credentials = clientData.credentials;
    }

    send(data){
        throw new Error('Not implemented');
    }

    getContentType(){
        throw new Error('Not implemented');
    }
}