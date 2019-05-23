const AirlineClientEntity = {
    username: {type: String, required: true},
    password: {type: String, required: true },
    triggersIds:{type: [Number]},
    filtersIds:{type: [Number]},
    validationsIds:{type: [Number]},
    airline:{type: String, required: true},
    requiredFields:{type: [String]},
    token:{type:String, required:true},
    endpointType:{type:String, required:true},
    responseContentType:{type:String, required: true},
    //transitorio.
    url:{type:String},
    port:{type:Number}
};
module.exports = AirlineClientEntity;