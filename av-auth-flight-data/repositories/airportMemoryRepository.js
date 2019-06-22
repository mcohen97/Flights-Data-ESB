const config = require('config');
const AirportRepository = require('./airportRepository');
const FileReader = require('../util/fileReader');
const Airport = require('../models/airport');

module.exports = class AirportMemoryRepository extends AirportRepository{
    constructor(){
        super();
        this.airports = [];
        this.airportsDict = [];
        load(this.airports, this.airportsDict);
    }

    async getAll(limit, offset){
        return this.airports.slice(offset, offset + limit);
    }

    async getByIataCode(iata){
        let id = this.airportsDict[iata];
        return this.airports[id];
    }
}

async function load(output, dict){
    try{
        const result = await FileReader.readCVS(config.get('data.file_airports'));
        result.shift(); // Remove CSV headers
        convertToAirportModel(result, output, dict);
    }catch (err){
        console.log(`Error while loading data file: ${err}`);
    }
}

function convertToAirportModel(input, output, dict) {
    var id = 0
    for (airport of input) {
        let iataCode = airport[0];
        let name = airport[1];
        let city = airport[2];
        let state = airport[3];        
        let country = airport[4];
        let latitude = airport[5];
        let longitude = airport[6];

        output.push(new Airport(iataCode,name,city,state,country,latitude,longitude));
        dict[iataCode] = id;
        id++;
    }
}

