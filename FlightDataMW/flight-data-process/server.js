const Config = require('config');
const Logger = require('logger')(Config.get('logger.type'));
const logger = new Logger();


module.exports.initServer = async function () {

    const AirlinesClientsRepository = require('repositories').AirlineServices;
    const FiltersRepository = require('repositories').Filters;

    const DataFilteringService = require('./services/data-filtering-service');
    const ConnectionsService = require('./services/connections-service');
    const DataProcessService = require('./services/data-process-service');

    const airlinesServicesRepository = new AirlinesClientsRepository();
    let transformationsDirectory = __dirname + Config.get("filters.transformationsDir");
    let validationsDirectory = __dirname + Config.get("filters.validationsDir");
    const filtersRepository = new FiltersRepository(transformationsDirectory,validationsDirectory);
    const filteringService = new DataFilteringService(filtersRepository);
    const connectionsService = new ConnectionsService(airlinesServicesRepository);
    const dataProccesService = new DataProcessService(connectionsService,filteringService);

    connectionsService.loadPreviousRegisteredClients();

    const Queue = require('bull');
    const incomingDataQueue = new Queue("data");
    const readyToSendQueue = new Queue("readyToSend");

    incomingDataQueue.process((bullJob,done) =>{
        let dataList = bullJob.data
        dataProccesService.executeTriggers(dataList);
        done();
    });
    readyToSendQueue.process((bullJob,done) =>{
        let job = bullJob.data;
        console.log('enviando');
        dataProccesService.send(job);
        done();
    });
}