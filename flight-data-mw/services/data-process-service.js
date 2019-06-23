const DataFieldsTypes = require('../data-description/flight-data-fields-types');
const Logger = require('logger')('file');
const logger = new Logger();


module.exports = class DataProcessService {

    constructor(connectionsService, filteringService) {
        this.clients = connectionsService;
        this.filteringService = filteringService;
    }

    async executeTriggers(dataReceived) {
        console.log(dataReceived.length);
        for (let data of dataReceived) {
            data = formatMessage(data);
            let connections = await this.clients.getByIata(data.AIRLINE);

            for(let connection of connections){
                let trigger = connection.getTrigger();
                if(trigger(data)){
                    filterValidateAndSend(this.filteringService, connection, data);
                }
            }
        }
    }
}

async function filterValidateAndSend(filteringService, client, data){

    let processedData =filteringService.applyTransformations(data,client);
    processedData.then((result) => {
                //console.log("procesado, resultado: ");
                logger.logInfo(data["FLIGHT_NUMBER"] + " transformed into " + result);
                result.MW_CHECKOUT_TIMESTAMP = Date.now();
                client.send(result);})
                 .catch((err) => client.send({error: `${err.toString()} stacktrace: ${err.stack}`}));
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