const DataFields = require('../data-description/flight-data-fields');
const Moment = require('moment'); 

module.exports = function validDate(data, next){
    console.log("validacion fecha correcta");
    if(!(DataFields.YEAR in data)){
        next(new Error(`The field ${DataFields.YEAR} is not in the record, date is invalid`));
    }else if(!(DataFields.MONTH in data)){
        next(new Error(`The field ${DataFields.MONTH} is not in the record, date is invalid`));
    }else if(!(DataFields.DAY in data)){
        next(new Error(`The field ${DataFields.DAY} is not in the record, date is invalid`));
    }else{
        let month=data.MONTH;
        let day=data.DAY;
        if(month<10){
            month= "0"+month;
        }
        if(day<10){
            day= "0"+day;
        }
        if(Moment(`${data.YEAR}-${month}-${day}`, 'YYYY-MM-DD',true).isValid()){
            console.log("FECHA CORRECTA");
            next(null,data);
        }else{
            console.log("FECHA INCORRECTA");
            next(new Error('Invalid date'));
        }
    }
}