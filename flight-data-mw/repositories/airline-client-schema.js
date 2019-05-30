const AirlineClientSchema = {
    username: {type: String,unique:true, required: true},
    password: {type: String, required: true },
    triggersIds:{type: [Number]},
    filtersIds:{type: [Number]},
    validationsIds:{type: [Number]},
    airline:{type: String, required: true},
    requestedFields:{type: [String]},
    token:{type:String, required:true},
    endpointType:{type:String, required:true},
    responseContentType:{type:String, required: true},
    triggerExpression:{type:String, required: false}
};
module.exports = AirlineClientSchema;  