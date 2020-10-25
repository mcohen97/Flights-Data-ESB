const DataFields = require('business-logic').FlightDataFieldsDictionary;

module.exports = function departureDelayAndTimeNotEmpty(job, next){
    let errorPlaceHolder = `flight number ${job.message.FLIGHT_NUMBER}, to client ${job.client.username}`;
    let data = job.message;
    if(!(DataFields.DEPARTURE_TIME in data)){
        next(new Error(`${errorPlaceHolder}: The field ${DataFields.DEPARTURE_TIME} is not in the record`));
    }else if(!(DataFields.DEPARTURE_DELAY in data)){
        next(new Error(`${errorPlaceHolder}: The field ${DataFields.DEPARTURE_DELAY} is not in the record`));
    }else{
        let departureTimeEmpty = data.DEPARTURE_TIME == "";
        let departureDelayEmpty = data.DEPARTURE_DELAY == "";
        if(departureTimeEmpty){
            next(new Error(`${errorPlaceHolder}: The field ${DataFields.DEPARTURE_TIME} is empty`));
        }else if(departureDelayEmpty){
            next(new Error(`${errorPlaceHolder}: The field ${DataFields.DEPARTURE_DELAY} is empty`));
        }else{
            job.message = data;
            next(null,job);
        }
    }
}