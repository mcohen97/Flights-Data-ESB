const DataFields = require('../data-description/flight-data-fields').Dictionary;

module.exports = function cancellationReasonToText(job, next){
    let data = job.message;
    if(!(DataFields.CANCELLATION_REASON in data)){
        next(new Error(`The field ${fieldDataFields.CANCELLATION_REASON} is not in the record, so it can't be converted to text`));
    }else{
        let text = charToText(data.CANCELLATION_REASON);
        console.log("el texto es:" +text);
        if(text){
            data.CANCELLATION_REASON = text;
            console.log(data.CANCELLATION_REASON);
            job.message = data;
            next(null,job);
        }else{
            next(new Error(`The field ${fieldDataFields.CANCELLATION_REASON} has invalid format, so it can't be converted to text`)); 
        }
    }

    function charToText(reason){
        let conversion;
        switch(reason){
            case 'A':
                conversion = 'Airline/Carrier';
                break;
            case 'B':
                conversion = 'Weather';
                break;
            case 'C':
                conversion = 'National Air System';
                break;
            case 'D':
                conversion= 'Security';
                break;
            default:
                conversion=null;
                break;
        }
        return conversion;
    }
}