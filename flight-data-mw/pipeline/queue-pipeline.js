const AbstractPipeline = require('./abstract-pipeline');
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
                this.emit('error', err);
                done(err);
            } else {
                if(hasRemainingFilters(result)){
                    sendToNextQueue(result,queues);
                }else{
                    //console.log("procesado, se ejecuta el callback:");
                    //console.log(result);
                    let clientCallback = callbacks[result.clientId];
                    delete callbacks[result.clientId]
                    clientCallback(null,result);
                }
                done();
            }
        });
    });
}
 function hasRemainingFilters(message){
    return message.pendingFilters.length > 0;
 }

 function sendToNextQueue(input,queues){
    let nextFilterId = input.pendingFilters.shift();
    console.log("next filter: "+ nextFilterId);
    let next = queues.find((q)=>q.name == nextFilterId);
    next.add(input, { removeOnComplete: true }); 
 }