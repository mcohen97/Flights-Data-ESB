const AirlineClientData = require('./airline-client-data');

module.exports = class AirlineRestClientData extends AirlineClientData{
    constructor(data){
        super(data);
        setUrl(data.url);
        setPort(data.port);
    }

    setUrl(url){
        //TODO: perform validations.
        this.url = url;
    }

    setPort(port){
        //TODO: perform validations.
        this.port = port;
    }
}