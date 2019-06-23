const DataFields = require('domain-entities').DataFieldsList;

module.exports = class InformationService{

    constructor(filtersRepository){
        this.filters = filtersRepository;
    }

    getCatalogInformation(){
        let info ={ transformations: this.filters.getAllTransformationsNames(),
                    validations: this.filters.getAllValidationsNames(),
                    data_fields : DataFields,
                    trigger_expression_operators:{
                        math: ['+','-','/','*'],
                        comparison: ['==','!=', '>', '>=','<','<='],
                        logical: ['and', 'or', 'not']
                    }
                }
        return info;
    }


}