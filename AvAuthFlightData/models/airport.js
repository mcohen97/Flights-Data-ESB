module.exports = class Airline {
    constructor(iata_code, name, city, state, country, latitude, longitude){
        this.iata_code = iata_code;
        this.name = name
        this.city = city
        this.state = state
        this.country = country
        this.latitude = latitude
        this.longitude = longitude
    }
}

