const TriggersRepository = require('./triggers-repository');
const Trigger = require('../models/trigger');

module.exports = class TriggersMemoryRepository extends TriggersRepository{
    
    constructor(){
        super();
        this.triggers = [];
        loadTestData(this.triggers);
    }
    
    async get(keyword){
        return this.triggers.find(t => t.keyword === keyword);
    }

    async getAll(){
        return this.triggers.slice();
    }

    async exists(keyword){
        return this.triggers.some(t => t.keyword === keyword);
    }

    async add(trigger){
        this.triggers.push(trigger);
    }

    async remove(keyword){
        for( let i =0; i< this.trigger.length; i++){
            if ( this.triggers[i].keyword === keyword){
                this.triggers.splice(i, 1);
            }
        }
    }
}

function loadTestData(output){
    let trivialTestTrigger = new Trigger('test', (data) => true, ["admin"]);
    output.push(trivialTestTrigger);
}