const Queue = require('bull');
const Config = require('config');
const Logger = require('logger')(Config.get('logger.type'));
const logger = new Logger();
const queue = new Queue("data", 'redis://127.0.0.1:6379');

module.exports = class FlightDataReceiver{

    constructor(){
    }

    async publish(req,res){
        let dataList = req.body;
        let message;
        logger.logInfo(`received ${dataList.length} flights from Av. Auth.`);
        checkInTimestamp(dataList);
        try{
            queue.add(dataList);
            res.status(200);
            message = {
                message: 'data received'
            };
        }catch(error){
            res.status(400);
            message ={
                message: error.message
            };
        }
        res.json(message);
    }
}

function checkInTimestamp(dataList){
    for(data of dataList)
        data.mw_checkin_timestamp = Date.now();  
}
