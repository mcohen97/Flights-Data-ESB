module.exports= class AirlineClient{

    constructor(clientData){
        this.data= clientData;
    }

    send(data){
        throw new Error('Not implemented');
    }

    getContentType(){
        throw new Error('Not implemented');
    }

    getTrigger(){
        return this.data.trigger;
    }

}