module.exports = class AirlineRestClientData{
    constructor(data){
        super(data);
        this.url = data.url;
        this.port = data.port;
    }
}