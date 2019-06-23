const Pipeline = require('../pipeline/pipeline');
const DataFields = require('domain-entities').FlightDataFieldsList;
const uuid = require('uuid/v1');

module.exports = class DataTransformationsService{

    constructor(filtersRepository){
        this.pipeline = new Pipeline();
        this.filters = filtersRepository;
        setUpPipeline(this.pipeline, this.filters);
    }
    
    async applyTransformations(data, connection){
        //Add extra metadata to message, for transformations.
        addRoutingInfo(data,connection);

        let promise = new Promise(function(resolve,reject){

          this.pipeline.run(data, (err,result) =>{
                if(err){
                    reject(err);
                }else{
                    //Delete metadata.
                    removeRoutingInfo(result);
                    resolve(result);
                }
            });}.bind(this));
        return promise;       
    }
}

function addRoutingInfo(data,connection){
    data.pendingValidations = connection.validationsIds.slice();
    data.fieldsSelected = false;
    data.requestedFields = connection.requestedFields.slice();
    data.pendingFilters = connection.filtersIds.slice();
    data.contentType = connection.responseContentType;
    //identify the callback
    data.callbackId = uuid();
}

function removeRoutingInfo(data){
    delete data.pendingFilters;
    delete data.pendingValidations;
    delete data.fieldsSelected;
    delete data.requestedFields;
    delete data.callbackId;
    delete data.contentType;
}

function setUpPipeline(pipeline, filtersRepository){
    filtersRepository.getAllTransformations().forEach( t => pipeline.use(t));
    pipeline.use(selectFields);
    filtersRepository.getAllValidations().forEach(v => pipeline.use(v));
}
//field selection filter, not dynamically provided.
function selectFields(data, next){
    let selectedFields = data.requestedFields;
    for(let key in data){
        //it is important to check if it is a record field, to avoid erasing the message routing metadata.
        if((DataFields.includes(key)) && (!selectedFields.includes(key))){
            delete data[key];
        }
    }
    console.log("datos seleccionados");
    next(null,data);
}