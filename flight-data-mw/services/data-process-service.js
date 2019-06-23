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
        let triggerCount = [];
        for (let data of dataReceived) {
            data = formatMessage(data);
            let connections = await this.clients.getByIata(data.AIRLINE);

            for(let connection of connections){
                let trigger = connection.getTrigger();
                if(trigger(data)){
                    if(!triggerCount[data["AIRLINE"]])
                        triggerCount[data["AIRLINE"]] = 0;
                    triggerCount[data["AIRLINE"]]++;
                    filterValidateAndSend(this.filteringService, connection, data);
                }
            }
        }
        //logger.logInfo("AA times triggered: " + triggerCount["AA"]);
    }
}

async function filterValidateAndSend(filteringService, client, data){

    let processedData =filteringService.applyTransformations(data,client);
    processedData.then((result) => {
                //console.log("procesado, resultado: ");
                if(data["AIRLINE"] == "AA")
                    logger.logInfo("AA DATA PROCESSED")
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