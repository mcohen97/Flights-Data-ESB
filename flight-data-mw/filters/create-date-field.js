const DataFields = require('domain-entities').FlightDataFieldsDictionary;

module.exports = function createDateField(job, next){
    let data = job.message;
    if(!(DataFields.YEAR in data)){
        next(new Error(`The field ${DataFields.YEAR} is not in the record, can't create DATE field`));
    }else if(!(DataFields.MONTH in data)){
        next(new Error(`The field ${DataFields.MONTH} is not in the record, can't create DATE field`));
    }else if(!(DataFields.DAY in data)){
        next(new Error(`The field ${DataFields.DAY} is not in the record, can't create DATE field`));
    }else{
        let month=data.MONTH;
        let day=data.DAY;
        if(month<10){
            month= "0"+month;
        }
        if(day<10){
            day= "0"+day;
        }
        data.DATE = `${day}/${month}/${data.YEAR}`;
        job.message = data;
        next(null,job);
    }
}