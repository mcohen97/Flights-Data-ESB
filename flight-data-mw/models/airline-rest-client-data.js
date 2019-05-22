const AirlineClientData = require('./airline-client-data');

module.exports = class AirlineRestClientData extends AirlineClientData{
    constructor(data){
        super(data);
        this.setUrl(data.url);
        this.setPort(data.port);
    }

    setUrl(url){
        if(!url){
            throw Error("The response endpoint's url must be specified");
        }
        this.url = url;
    }

    setPort(port){
        if(!port){
            throw Error("The response endpoint's port must be specified");        
        }
        this.port = port;
    }
}