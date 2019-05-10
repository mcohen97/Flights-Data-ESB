module.exports= class AirlineClient{
    constructor(token){
        this.token= token;
    }

    send(data){
        throw new Error('Not implemented');
    }

    getContentType(){
        throw new Error('Not implemented');
    }
}