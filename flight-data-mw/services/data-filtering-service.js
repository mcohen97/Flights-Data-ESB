const Pipeline = require('../pipeline/pipeline');
const glob = require('glob');

module.exports = class DataFilteringService{

    constructor(){
        this.pipeline = new Pipeline();
        setUpPipeline(this.pipeline);
    }
    
    async processData(data){
        return new Promise(function(resolve,reject){
            this.pipeline.run(data, (err,result) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        });        
    }
}

function setUpPipeline(pipeline){
    let filter;
    glob.sync( '../filters/*.js' ).forEach( function( file ) {
        filter = require( path.resolve( file ) );
        if(typeof filter == "function"){
            pipeline.use(filter);
        }
    });
}