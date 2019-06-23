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
                    filterAndValidate(this.filteringService, connection, data);
                }
            }
        }
        //logger.logInfo("AA times triggered: " + triggerCount["AA"]);
    }

    async send(job){
        let connection = await this.clients.getByUsername(job.client.username);
        job.message.MW_CHECKOUT_TIMESTAMP = Date.now();
        connection.send(job.message);
    }
}

async function filterAndValidate(filteringService, client, data){
    let job = {
        message: data,
        client: client,
    };
    /*let processedData =filteringService.applyTransformations(job);
    processedData.then((result) => {
                //console.log("procesado, resultado: ");
                if(data["AIRLINE"] == "AA")
                    logger.logInfo("AA DATA PROCESSED")
                result.MW_CHECKOUT_TIMESTAMP = Date.now();
                client.send(result);})
                 .catch((err) => client.send({error: `${err.toString()} stacktrace: ${err.stack}`}));
    */
   filteringService.applyTransformations(job);
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