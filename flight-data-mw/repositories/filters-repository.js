const glob = require('glob');
const chokidar = require('chokidar');

module.exports = class FiltersRepository{
    constructor(){
        this.filters=loadFilters();
        this.validations=loadValidations();
        this.filtersWatcher = chokidar.watch(__dirname+ '/../filters/',{ignoreInitial: true});
        this.validationsWatcher = chokidar.watch(__dirname+ '/../validations/',{ignoreInitial: true});
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

function loadFilters(){
    let filters = [];
    let filter;
    glob.sync( __dirname+ '/../filters/*.js' ).forEach( function( file ) {
        filter = require(file);
        if(typeof filter == "function"){
            filters.push(filter);
        }else{
            //TODO: log this event
        }
    });
    return filters;
}

function loadValidations(){
    let validations=[];
    let validation;
    glob.sync( __dirname+ '/../validations/*.js' ).forEach( function( file ) {
        validation = require(file);
        if(typeof validation == "function"){
            validations.push(validation);
        }else{
            //TODO: log this event
        }
    });
    return validations;
}