module.exports = class DataProcess{

    constructor(dataProcessService){
        this.dataProcessor = dataProcessService;
    }

    async publish(req,res){
        let dataList = req.body;
        let message;
        checkInTimestamp(dataList);
        try{
            this.dataProcessor.executeTriggers(dataList)
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