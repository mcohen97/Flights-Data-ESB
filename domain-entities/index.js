module.exports.ServiceFactory = require('./models/airline-client-data-factory');
module.exports.Abstract = require('./models/abstract-airline-client-data');
module.exports.Rest = require('./models/airline-rest-client-data');
module.exports.EndpointTypes = require('./data-description/endpoint-types');
module.exports.FlightDataFieldsList = require('./data-description/flight-data-fields').List;
module.exports.FlightDataFieldsDictionary = require('./data-description/flight-data-fields').Dictionary;
module.exports.TriggerParser = require('./models/trigger-parser');
module.exports.Airlines = require('./data-description/airlines');
module.exports.DataFieldsTypes = require('./data-description/flight-data-fields-types');