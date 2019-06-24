const config = require('config');
const FlightRepository = require('./flightRepository');
const FileReader = require('../util/fileReader');
const Flight = require('../models/flight');

module.exports = class FlightMemoryRepository extends FlightRepository{
    constructor(){
        super();
        this.flights = [];
        this.flightsDict = [];
        load(this.flights, this.flightsDict);
    }

    async getAll(limit, offset){
        this.flights = [];
        this.flightsDict = [];
        await load(this.flights,this.flightsDict,limit,offset);
        return this.flights;
    }

    async getByFlightNumber(flight_number){
        let id = this.flightsDict[flight_number];
        return this.flights[id];
    }
}

async function load(output, dict, limit = 50, offset = 0){
    try{
        const result = await FileReader.readCVS(config.get('data.file_flights'),limit,offset);
        result.shift(); // Remove CSV headers
        convertToFlightModel(result, output, dict);
    }catch (err){
        console.log(`Error while loading data file: ${err}`);
    }
}

function convertToFlightModel(input, output, dict) {
    var id = 0;
    for (flight of input) {
        let year = flight[0];
        let month = flight[1];
        let day= flight[2];
        let day_of_week = flight[3];
        let airline = flight[4];
        let flight_number = flight[5];
        let tail_number = flight[6];
        let origin_aiport = flight[7];
        let destination_airport = flight[8];
        let scheduled_departure = flight[9];
        let departure_time = flight[10];
        let departure_delay = flight[11];
        let taxi_out = flight[12];
        let wheels_off = flight[13];
        let scheduled_time = flight[14];
        let elapsed_time = flight[15];
        let air_time = flight[16];
        let distance = flight[17];
        let wheels_on = flight[18];
        let taxi_in = flight[19];
        let scheduled_arrival = flight[20];
        let arrival_time = flight[21];
        let arrival_delay = flight[22];
        let diverted = flight[23];
        let cancelled = flight[24];
        let cancellation_reason = flight[25];
        let air_system_delay = flight[26];
        let security_delay = flight[27];
        let airline_delay = flight[28];
        let late_aircraft_delay = flight[29];
        let weather_delay = flight[30];

        output.push(new Flight(
            year,
            month,
            day,
            day_of_week,
            airline,
            flight_number,
            tail_number,
            origin_aiport,
            destination_airport,
            scheduled_departure,
            departure_time,
            departure_delay,
            taxi_out,
            wheels_off,
            scheduled_time,
            elapsed_time,
            air_time,
            distance,
            wheels_on,
            taxi_in,
            scheduled_arrival,
            arrival_time,
            arrival_delay,
            diverted,
            cancelled,
            cancellation_reason,
            air_system_delay,
            security_delay,
            airline_delay,
            late_aircraft_delay,
            weather_delay
            ));
        dict[flight_number] = id;
        id++;
    }
}

