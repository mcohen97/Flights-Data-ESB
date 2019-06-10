const DataFieldsTypes = require('../data-description/flight-data-fields-types');

module.exports = class DataProcessService {

    constructor(airlineClientsService, filteringService) {
        this.clients = airlineClientsService;
        this.filteringService = filteringService;
    }

    async executeTriggers(dataReceived) {
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

function filterValidateAndSend(filteringService, client, data){
    data.pendingValidations = client.validationsIds.slice();
    data.fieldsSelected = false;
    data.requestedFields = client.requestedFields.slice();
    data.pendingFilters = client.filtersIds.slice();
    data.clientId = client.username;
    let processedData =filteringService.processData(data);
    processedData.then((result) => {
                console.log("procesado, resultado: ");
                result.MW_CHECKOUT_TIMESTAMP = Date.now();
                //delete metadata.
                delete result.pendingFilters;
                delete result.pendingValidations;
                delete result.fieldsSelected;
                delete result.requestedFields;
                delete result.clientId;

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