const DataFields = require('../data-description/flight-data-fields');

module.exports = function cancelledToBoolean(data, next){
    if((DataFields.CANCELLED in data)){
        next(new Error(`The field ${fieldDataFields.CANCELLED} is not in the record, so it can't be converted to boolean`));
    }else{
        data.CANCELLED = (data.CANCELLED == 0);
        next(null,data);
    }
}