const Queue = require('bull');
const queue = new Queue("data");

module.exports = class FlightDataReceiver{

    constructor(){
    }

    async publish(req,res){
        let dataList = req.body;
        let message;
        checkInTimestamp(dataList);
        try{
            queue.add(dataList);
            res.status(200);
            message = {
                message: 'data processed'
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
