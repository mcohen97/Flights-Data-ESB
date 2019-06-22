const AbstractPipeline = require('./abstract-pipeline');
const toContentType = require('../services/content-type-transformation');
const Queue = require('bull');

class QueuePipeline extends AbstractPipeline {
    constructor() {
        super();
        this.queues = [];
        this.callbacks = {};
    }
    use(filter) {
        let filterQueue = new Queue(filter.name)
        setUpQueue(filterQueue,this.queues, this.callbacks,filter);
        this.queues.push(filterQueue);
        return super.use(filter);
    }
    run(input,callback) {
        if(hasRemainingFilters(input)){
            this.callbacks[input.clientId] = callback;
            sendToNextQueue(input,this.queues);
        }else{
            callback(null,input);
        }
    }
}
module.exports = QueuePipeline;

function setUpQueue(newQueue,queues,callbacks,filter){
    newQueue.process((job, done) => {
        filter.call(this, job.data, (err, result) => {
            if (err) {
                console.log("HAY UN ERROR: "+ err.message);
                done();
            } else {
                if(hasRemainingFilters(result)){
                    sendToNextQueue(result,queues);
                }else{
                    let clientCallback = callbacks[result.clientId];
                    delete callbacks[result.clientId]
                    console.log('finished');
                    //the last filter
                    toContentType(result,(error,processedData) =>clientCallback(error,processedData))
                    //clientCallback(null, result);
                }
                done();
            }
        });
    });
}
 function hasRemainingFilters(message){
    return message.pendingFilters.length > 0 || !message.fieldsSelected ||message.pendingValidations > 0;
 }

 function sendToNextQueue(input,queues){
    let nextFilterId;
    if(input.pendingValidations.length >0){
     //validations first.
     nextFilterId = input.pendingValidations.shift();
    }else if (!input.fieldsSelected){
     //when validations are finished, select fields.
     nextFilterId = "selectFields";
     input.fieldsSelected = true;
    }else{
     //then we transform the remaining fields.
     nextFilterId = input.pendingFilters.shift();
    }
    console.log(`next filter id: ${nextFilterId}`);
    let next = queues.find((q)=>q.name == nextFilterId);
    next.add(input, { removeOnComplete: true }); 
 }

