const DataFields = require('domain-entities').FlightDataFieldsDictionary;

module.exports = function cancelled0or1(job, next){
    let data = job.message;
    if(!(DataFields.CANCELLED in data)){
        next(new Error(`The field ${DataFields.CANCELLED} is not in the record`));
    }else{
        if(data.CANCELLED==0 || data.CANCELLED==1){
            job.message = data;
            next(null, job);
        }else{
            next(new Error(`The field ${DataFields.CANCELLED} is not 0 or 1`));
        }
    }
}