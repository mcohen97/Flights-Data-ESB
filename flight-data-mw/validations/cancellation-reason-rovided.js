const DataFields = require('domain-entities').FlightDataFieldsDictionary;

module.exports = function cancellationReasonProvided(data, next){
    if(!(DataFields.CANCELLED in data)){
        next(new Error(`The field ${DataFields.CANCELLED} is not in the record`));
    }else if(!(DataFields.CANCELLATION_REASON in data)){
        next(new Error(`The field ${DataFields.CANCELLATION_REASON} is not in the record`));
    }else{
        if(data.CANCELLED==1 && data.CANCELLATION_REASON.length>0){
            next(null, data);
        }else{
            next(new Error(`The field ${DataFields.CANCELLATION_REASON} can't be empty if ${DataFields.CANCELLED} is 1`));
        }
    }
}