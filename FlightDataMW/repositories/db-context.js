const Config = require('config');
const mongoose = require('mongoose');
const AirlineClientSchema= require('./airline-client-schema');
const Credentials = require('./credentials-schema');
const AirlineRestClientSchema = require('./airline-rest-client-schema')
const AirlineClientFactory = require('business-logic').ServiceFactory;
const EndpointTypes = require('business-logic').EndpointTypes;
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
        AirlineClient.discriminator(EndpointTypes.REST_API,new Schema(AirlineRestClientSchema,options));
        module.exports.AirlineClient = AirlineClient;

        const credentialsSchema = new Schema(Credentials,{id:false});
        let Credential = this.connection.model('Credential',credentialsSchema);
        module.exports.Credential= Credential;
    }

    static getUrl() {
        let connectionUrl = Config.get('repository.url');
        return connectionUrl;
    }
}
