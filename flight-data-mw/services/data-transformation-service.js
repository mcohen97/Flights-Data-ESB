const Pipeline = require('../pipeline/pipeline');
const DataFields = require('../data-description/flight-data-fields').List;
const uuid = require('uuid/v1');

module.exports = class DataTransformationsService{

    constructor(filtersRepository){
        this.pipeline = new Pipeline();
        this.filters = filtersRepository;
        setUpPipeline(this.pipeline, this.filters);
    }
    
    async applyTransformations(job){
        //Add extra metadata to message, for transformations.
        addRoutingInfo(job);
        this.pipeline.run(job);
        /*let promise = new Promise(function(resolve,reject){
            
          this.pipeline.run(data, (err,result) =>{
                if(err){
                    reject(err);
                }else{
                    //Delete metadata.
                    removeRoutingInfo(result);
                    resolve(result);
                }
            });}.bind(this));
        return promise; */      
    }
}

function addRoutingInfo(job){
    job.pendingValidations = job.client.validationsIds.slice();
    job.fieldsSelected = false;
    job.requestedFields = job.client.requestedFields.slice();
    job.pendingFilters = job.client.filtersIds.slice();
    job.contentType = job.client.responseContentType;
    //identify the callback
    //job.callbackId = uuid();
}

function removeRoutingInfo(job){
    delete job.pendingFilters;
    delete job.pendingValidations;
    delete job.fieldsSelected;
    delete job.requestedFields;
    //delete job.callbackId;
    delete job.contentType;
}

function setUpPipeline(pipeline, filtersRepository){
    filtersRepository.getAllTransformations().forEach( t => pipeline.use(t));
    pipeline.use(selectFields);
    filtersRepository.getAllValidations().forEach(v => pipeline.use(v));
}
//field selection filter, not dynamically provided.
function selectFields(job, next){
    let selectedFields = job.requestedFields;
    for(let key in job.message){
        //it is important to check if it is a record field, to avoid erasing the message routing metadata.
        if((DataFields.includes(key)) && (!selectedFields.includes(key))){
            delete job.message[key];
        }
    }
    console.log("datos seleccionados");
    next(null,job);
}