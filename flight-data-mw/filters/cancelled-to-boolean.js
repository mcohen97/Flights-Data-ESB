const DataFields = require('../data-description/flight-data-fields').Dictionary;

module.exports = function cancelledToBoolean(job, next){
    let data = job.message;
    if(!(DataFields.CANCELLED in data)){
        next(new Error(`The field ${fieldDataFields.CANCELLED} is not in the record, so it can't be converted to boolean`));
    }else{
        data.CANCELLED = (data.CANCELLED == 0);
        job.message = data;
        next(null,job);
    }
}