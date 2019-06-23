const DataFields = require('domain-entities').FlightDataFieldsDictionary;

module.exports = function giveDelayReason(data, next){
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
        next(null,data);
    }
}

function isNotInData(field, record){
 return !(field in record);
}