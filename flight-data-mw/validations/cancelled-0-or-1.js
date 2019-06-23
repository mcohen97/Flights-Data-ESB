const DataFields = require('domain-entities').FlightDataFieldsDictionary;

module.exports = function cancelled0or1(data, next){
    if(!(DataFields.CANCELLED in data)){
        next(new Error(`The field ${DataFields.CANCELLED} is not in the record`));
    }else{
        if(data.CANCELLED==0 || data.CANCELLED==1){
            next(null, data);
        }else{
            next(new Error(`The field ${DataFields.CANCELLED} is not 0 or 1`));
        }
    }
}