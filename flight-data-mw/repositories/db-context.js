const Config = require('config');
const mongoose = require('mongoose');
const AirlineClientSchema= require('./airline-client-schema');
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
        const airlineClientSchema = new Schema(AirlineClientSchema, { id: false });
        airlineClientSchema.set('toObject', {
            transform: function (doc, ret) {
                ret = AirlineClientFactory.createClientData(ret);
            }
        });
        module.exports.AirlineClient = this.connection.model('AirlineClient', airlineClientSchema);
    }

    static getUrl() {
        let connectionUrl = Config.get('repository.url');
        return connectionUrl;
    }
}
