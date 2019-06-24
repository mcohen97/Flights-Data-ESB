const DataFields = require('business-logic').FlightDataFieldsDictionary;

module.exports = function giveDelayReason(job, next){
    let data = job.message;
    let allDelayFields = [DataFields.AIR_SYSTEM_DELAY,DataFields.SECURITY_DELAY,
        DataFields.AIRLINE_DELAY,DataFields.LATE_AIRCRAFT_DELAY,
        DataFields.WEATHER_DELAY];

    let noDelayFields = allDelayFields.every(field => isNotInData(field,data));
    if(noDelayFields){
        next(new Error(`There are no delay fields, we can't provide DELAY_REASON`));
    }else{
        let reason ="";
        allDelayFields.forEach(field => {
            if(field in data){
                if(reason != ""){
                    reason +=", ";
                }
                reason += data[field];
            }});
        data.DELAY_REASON = reason;
        job.message = data
        next(null,job);
    }
}

function isNotInData(field, record){
 return !(field in record);
}