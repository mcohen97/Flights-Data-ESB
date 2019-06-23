const Config = require('config');
const Logger = require('logger')(Config.get('logger.type'));
const logger = new Logger();


module.exports.initServer = async function () {

    const AirlinesClientsRepository = require('repositories').AirlineServices;
    const FiltersRepository = require('repositories').Filters;

    const DataFilteringService = require('./services/data-transformation-service');
    const ConnectionsService = require('./services/connections-service');
    const DataProcessService = require('./services/data-process-service');

    const Queue = require('bull');
    const publishedFlightsQueue = new Queue("data");

    const airlinesServicesRepository = new AirlinesClientsRepository();
    let transformationsDirectory = __dirname + Config.get("filters.transformationsDir");
    let validationsDirectory = __dirname + Config.get("filters.validationsDir");
    const filtersRepository = new FiltersRepository(transformationsDirectory,validationsDirectory);
    const filteringService = new DataFilteringService(filtersRepository);
    const connectionsService = new ConnectionsService(airlinesServicesRepository);
    const dataProccesService = new DataProcessService(connectionsService,filteringService);

    connectionsService.loadPreviousRegisteredClients();

    publishedFlightsQueue.process(2,(job,done) =>{
        //console.log("job processed - "+jobNumber);
        //console.log("   data length: "+job.data.length);
        //jobNumber++;
        dataProccesService.executeTriggers(job.data);
        done();
    })
}