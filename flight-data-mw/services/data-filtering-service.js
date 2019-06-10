const Pipeline = require('../pipeline/pipeline');
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
                    //console.log("en la promise");
                    //console.log(result);
                    resolve(result);
                }
            });}.bind(this));
        return promise;       
    }
}

function setUpPipeline(pipeline){
    let filter;
    glob.sync( __dirname+ '/../filters/*.js' ).forEach( function( file ) {
        filter = require(file);
        if(typeof filter == "function"){
            //console.log("va filtro: "+ filter.name);
            pipeline.use(filter);
        }
    });
}