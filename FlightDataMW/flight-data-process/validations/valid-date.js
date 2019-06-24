const DataFields = require('business-logic').FlightDataFieldsDictionary;
const Moment = require('moment'); 

module.exports = function validDate(job, next){
    let data = job.message;
    if(!(DataFields.YEAR in data)){
        console.log("ERROR DE FECHA");
        next(new Error(`The field ${DataFields.YEAR} is not in the record, date is invalid`));
    }else if(!(DataFields.MONTH in data)){
        console.log("ERROR DE FECHA");
        next(new Error(`The field ${DataFields.MONTH} is not in the record, date is invalid`));
    }else if(!(DataFields.DAY in data)){
        console.log("ERROR DE FECHA");
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
            job.message = data;
            next(null,job);
        }else{
            console.log("ERROR DE FECHA");
            next(new Error('Invalid date'));
        }
    }
}