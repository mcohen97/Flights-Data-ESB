const DataFields = require('domain-entities').FlightDataFieldsDictionary;

module.exports = function cancellationReasonProvided(job, next){
    let data = job.message;
    if(!(DataFields.CANCELLED in data)){
        next(new Error(`The field ${DataFields.CANCELLED} is not in the record`));
    }else if(!(DataFields.CANCELLATION_REASON in data)){
        next(new Error(`The field ${DataFields.CANCELLATION_REASON} is not in the record`));
    }else{
        if(data.CANCELLED==1 && data.CANCELLATION_REASON.length>0){
            job.message = data;
            next(null, job);
        }else{
            next(new Error(`The field ${DataFields.CANCELLATION_REASON} can't be empty if ${DataFields.CANCELLED} is 1`));
        }
    }
}