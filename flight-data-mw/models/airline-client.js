module.exports= class AirlineClient{

    constructor(token,credentials){
        this.token= token;
        this.credentials = credentials;
    }

    send(data){
        throw new Error('Not implemented');
    }

    getContentType(){
        throw new Error('Not implemented');
    }
}