const deferBinding =require('./repository');
module.exports.DBContext = require('./db-context');
module.exports.AirlineServices = deferBinding('airlines-clients');
module.exports.Credentials = deferBinding('clients-credentials');
module.exports.Filters= require('./filters-repository');