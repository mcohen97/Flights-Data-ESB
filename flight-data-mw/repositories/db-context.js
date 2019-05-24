const Config = require('config');
const mongoose = require('mongoose');
const AirlineClientSchema= require('./airline-client-schema');
const AirlineRestClientSchema = require('./airline-rest-client-schema')
const AirlineClientFactory = require('../models/airline-client-data-factory');
const Schema = mongoose.Schema;

module.exports = class DBContext {
    constructor() {
        this.connection = null;
    }

    static async initRepository() {
        try {
            await this.connect();
            await this.loadCollections();
        } catch (err) {
            console.log(`Error trying to connect to database: ${err}`);
        }
    }

    static async connect() {
        this.connection = await mongoose.connect(this.getUrl(), { useNewUrlParser: true });
    }
    
    static async loadCollections() {

        let options = {discriminatorKey: 'endpointType',
                       id: false };

        const airlineClientSchema = new Schema(AirlineClientSchema, options);
        airlineClientSchema.set('toObject', {
            transform: function (doc, ret) {
                ret = AirlineClientFactory.createClientData(ret);
            }
        });
        let AirlineClient = this.connection.model('AirlineClient', airlineClientSchema);
        AirlineClient.discriminator('AirlineRestClient',new Schema(AirlineRestClientSchema,options));
        module.exports.AirlineClient = AirlineClient;
    }

    static getUrl() {
        let connectionUrl = Config.get('repository.url');
        return connectionUrl;
    }
}
