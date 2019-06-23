const glob = require('glob');
const chokidar = require('chokidar');

module.exports = class FiltersRepository{
    constructor(transformationsDir, validationsDir){
        if(!transformationsDir.endsWith('/')){
            transformationsDir+='/';
        }
        if(!validationsDir.endsWith('/')){
            validationsDir+='/';
        }
        this.filters=loadTransformations(transformationsDir);
        this.validations=loadValidations(validationsDir);
        this.filtersWatcher = chokidar.watch(transformationsDir,{ignoreInitial: true});
        this.validationsWatcher = chokidar.watch(validationsDir,{ignoreInitial: true});
    }

    getAllTransformations(){
        return this.filters;
    }

    getAllTransformationsNames(){
        return this.filters.map(function(f){return f.name});
    }

    getAllValidations(){
        return this.validations;
    }

    getAllValidationsNames(){
        return this.validations.map(function(f){return f.name});
    }

    onTransformationAdded(callback){
        this.filtersWatcher.on('add', path => callback(`File ${path} has been added`))
    }
}

function loadTransformations(transformationsDir){
    let filters = [];
    let filter;
    glob.sync( `${transformationsDir}*.js` ).forEach( function( file ) {
        filter = require(file);
        if(typeof filter == "function"){
            filters.push(filter);
        }else{
            //TODO: log this event
        }
    });
    return filters;
}

function loadValidations(validationsDir){
    let validations=[];
    let validation;
    glob.sync( `${validationsDir}*.js` ).forEach( function( file ) {
        validation = require(file);
        if(typeof validation == "function"){
            validations.push(validation);
        }else{
            //TODO: log this event
        }
    });
    return validations;
}