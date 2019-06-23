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
    }
}

function addRoutingInfo(job){
    job.pendingValidations = job.client.validationsIds.slice();
    job.fieldsSelected = false;
    job.requestedFields = job.client.requestedFields.slice();
    job.pendingFilters = job.client.filtersIds.slice();
    job.contentType = job.client.responseContentType;
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