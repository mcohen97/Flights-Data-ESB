const DataFields = require('../data-description/flight-data-fields').Dictionary;

module.exports = function departureDelayAndTimeNotEmpty(data, next){
    if(!(DataFields.DEPARTURE_TIME in data)){
        next(new Error(`The field ${DataFields.DEPARTURE_TIME} is not in the record`));
    }else if(!(DataFields.DEPARTURE_DELAY in data)){
        next(new Error(`The field ${DataFields.DEPARTURE_DELAY} is not in the record`));
    }else{
        let departureTimeEmpty = data.DEPARTURE_TIME == "";
        let departureDelayEmpty = data.DEPARTURE_DELAY == "";
        if(departureTimeEmpty){
            next(new Error(`The field ${DataFields.DEPARTURE_TIME} is empty`));
        }else if(departureDelayEmpty){
            next(new Error(`The field ${DataFields.DEPARTURE_DELAY} is empty`));
        }else{
            next(null,data);
        }
    }
}