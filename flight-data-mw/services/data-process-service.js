const DataFieldsTypes = require('../data-description/flight-data-fields-types');

module.exports = class DataProcessService {

    constructor(airlineClientsService) {
        this.clients = airlineClientsService;
    }

    async executeTriggers(dataReceived) {
        for (let data of dataReceived) {
            let connections = await this.clients.getByIata(data.AIRLINE);
            data = formatMessage(data);

            for(connection of connections){
                let trigger = connection.getTrigger();
                if(trigger(data)){
                    data.mw_checkout_timestamp = Date.now();
                    connection.send(data);
                }
            }
        }
    }
}

function formatMessage(object) {
    let keys = Object.keys(object);
    let n = keys.length;
    let newobj = {}
    let key;
    while (n--) {
        key = keys[n];
        let data = castType(key,object);
        newobj[key.toUpperCase()] = data;
    }
    return newobj;
}

function castType(key,object){
  let dataType = DataFieldsTypes[key.toUpperCase()];
  switch(dataType){
      case Number:
        return Number(object[key]);
      break;
      default:
        return object[key];
      break;
    //add more cases if needed.
  }

}