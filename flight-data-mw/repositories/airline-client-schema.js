const AirlineClientSchema = {
    username: {type: String, required: true},
    password: {type: String, required: true },
    triggersIds:{type: [Number]},
    filtersIds:{type: [Number]},
    validationsIds:{type: [Number]},
    airline:{type: String, required: true},
    requestedFields:{type: [String]},
    token:{type:String, required:true},
    endpointType:{type:String, required:true},
    responseContentType:{type:String, required: true}
};
module.exports = AirlineClientSchema;  