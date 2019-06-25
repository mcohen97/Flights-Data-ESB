const AbstractPipeline = require('./abstract-pipeline');
const toContentType = require('../services/content-type-transformation');
const Queue = require('bull');
const readyToSendQueue = new Queue("readyToSend");
const Logger = require('logger')('file');
const logger = new Logger();


class QueuePipeline extends AbstractPipeline {
    constructor() {
        super();
        this.queues = [];
    }
    use(filter) {
        let filterQueue = new Queue(filter.name)
        setUpQueue(filterQueue,this.queues,filter);
        this.queues[filter.name] = filterQueue;
        return super.use(filter);
    }
    run(job) {
        checkFinishedJob(job, this.queues);
    }
}
module.exports = QueuePipeline;

function setUpQueue(newQueue,queues,filter){
    newQueue.process((bullJob, done) => {
        let job = bullJob.data;
        filter.call(this, job, (err, jobResult) => {
            if (err) {
                logger.logError("HAY UN ERROR: "+ err.message);
            } else {
                jobResult;
                checkFinishedJob(jobResult,queues);
            }
            done();
        });
    });
}

function checkFinishedJob(job, queues){
    if(hasRemainingFilters(job)){
        sendToNextQueue(job,queues);
    }else{
        readyToSendQueue.add(job);
    }
}

 function hasRemainingFilters(job){
    return job.pendingFilters.length > 0 || !job.fieldsSelected ||job.pendingValidations > 0;
 }

 function sendToNextQueue(job,queues){
    let nextFilterId;
    if(job.pendingValidations.length >0){   //validations first.
        nextFilterId = job.pendingValidations.shift();
    }else if(job.pendingFilters.length >0){ //then transformations.
        nextFilterId = job.pendingFilters.shift();
    }else{  //finally fields selection.
        nextFilterId = "selectFields";
        job.fieldsSelected = true;
    }
    logger.logInfo(`flight ${job.message.FLIGHT_NUMBER}, next filter id ${nextFilterId}`);
    let next = queues[nextFilterId];
    if(next){
        next.add(job, { removeOnComplete: true }); 
    }else{
        logger.logError("no existe "+ nextFilterId);
    }
 }

