const DataFields = require('../data-description/flight-data-fields').Dictionary;

module.exports = function cancelled0or1(data, next){
    console.log("validacion cancelacion 0 o 1");
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