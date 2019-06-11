const Pipeline = require('../pipeline/pipeline');
const DataFields = require('../data-description/flight-data-fields');
const glob = require('glob');

module.exports = class DataFilteringService{

    constructor(){
        this.pipeline = new Pipeline();
        setUpPipeline(this.pipeline);
    }
    
    async processData(data){
        let promise = new Promise(function(resolve,reject){

          this.pipeline.run(data, (err,result) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });}.bind(this));
        return promise;       
    }
}

function setUpPipeline(pipeline){
    //the same pipeline can be reused for validations, field selection and transformations.
    let filter;
    glob.sync( __dirname+ '/../filters/*.js' ).forEach( function( file ) {
        filter = require(file);
        if(typeof filter == "function"){
            pipeline.use(filter);
        }
    });
    pipeline.use(selectFields);
    let validation;
    glob.sync( __dirname+ '/../validations/*.js' ).forEach( function( file ) {
        validation = require(file);
        if(typeof validation == "function"){
            pipeline.use(validation);
        }
    });
}
//field selection filter, not dynamically provided.
function selectFields(data, next){
    let selectedFields = data.requestedFields;
    let allFields = Object.keys(DataFields);
    for(let key in data){
        //it is important to check if it is a record field, to avoid erasing the message routing metadata.
        if((allFields.includes(key)) && (!selectedFields.includes(key))){
            delete data[key];
        }
    }
    console.log("datos seleccionados");
    next(null,data);
}