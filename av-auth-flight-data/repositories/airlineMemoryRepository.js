const config = require('config');
const AirlineRepository = require('./airlineRepository');
const FileReader = require('../util/fileReader');
const Airline = require('../models/airline');

module.exports = class AirlineMemoryRepository extends AirlineRepository{
    constructor(){
        super();
        this.airlines = [];
        this.airlinesDict = [];
        load(this.airlines, this.airlinesDict);
    }

    async getAll(limit, offset){
        return this.airlines.slice(offset, offset + limit);
    }

    async getByIataCode(iata){
        return this.airlinesDict[iata];
    }
}

async function load(output, dictOutput){
    try{
        const result = await FileReader.readCVS(config.get('data.file_airlines'), 10);
        result.shift(); // Remove CSV headers
        convertToModel(result, output);
        convertToDict(result, dictOutput);
    }catch (err){
        console.log(`Error while loading data file: ${err}`);
    }
}

function convertToModel(input, output) {
    for (airline of input) {
        let iataCode = airline[0];
        let name = airline[1];
        output.push(new Airline(iataCode, name));
    }
}

function convertToDict(input, output) {
    for (airline of input) {
        let iataCode = airline[0];
        let name = airline[1];
        output[iataCode] = name;
    }
}
