const DataFieldsTypes = require('business-logic').DataFieldsTypes;
const Job = require('../models/job');
const Config = require('config');
const Logger = require('logger')(Config.get('logger.type'));
const logger = new Logger();


module.exports = class DataProcessService {

    constructor(connectionsService, filteringService) {
        this.clients = connectionsService;
        this.filteringService = filteringService;
    }

    async executeTriggers(dataReceived) {

        for (let data of dataReceived) {
            let airline = this.getAirline(data);
            let clientsConnections = await this.clients.getByIata(airline);
                if(clientsConnections && clientsConnections.length > 0){
                    try{
                    data = formatMessage(data);//only format data for existing airlines with subscribed services.
                    this.evaluateTriggers(clientsConnections,data);
                    }catch(err){
                        logger.logError(`invalid record ${err.message}`);
                    }
                }
        }
    }

     getAirline(data){
        if("airline" in data){
            return data.airline;
        }else if("AIRLINE" in data){
            return data.AIRLINE;
        }else{
            return "";
        }
    }

    async evaluateTriggers(clientsConnections,data){
        for(let client of clientsConnections){
            let trigger = client.getTrigger();
            if(trigger(data)){
                let job = new Job(data,client);
                this.filteringService.applyTransformations(job);
            }
        }
    }

    async send(job){
        let connection = await this.clients.getByUsername(job.client.username);
        job.message.MW_CHECKOUT_TIMESTAMP = Date.now();
        connection.send(job.message);
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