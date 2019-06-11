module.exports = class Flight {
    constructor(
        YEAR,
        MONTH,
        DAY,
        DAY_OF_WEEK,
        AIRLINE,
        FLIGHT_NUMBER,
        TAIL_NUMBER,
        ORIGIN_AIRPORT,
        DESTINATION_AIRPORT,
        SCHEDULED_DEPARTURE,
        DEPARTURE_TIME,
        DEPARTURE_DELAY,
        TAXI_OUT,
        WHEELS_OFF,
        SCHEDULED_TIME,
        ELAPSED_TIME,
        AIR_TIME,
        DISTANCE,
        WHEELS_ON,
        TAXI_IN,
        SCHEDULED_ARRIVAL,
        ARRIVAL_TIME,
        ARRIVAL_DELAY,
        DIVERTED,
        CANCELLED,
        CANCELLATION_REASON,
        AIR_SYSTEM_DELAY,
        SECURITY_DELAY,
        AIRLINE_DELAY,
        LATE_AIRCRAFT_DELAY,
        WEATHER_DELAY
        ){
            this.year = YEAR;
            this.month = MONTH;
            this.day= DAY;
            this.day_of_week = DAY_OF_WEEK;
            this.airline = AIRLINE;
            this.flight_number = FLIGHT_NUMBER;
            this.tail_number = TAIL_NUMBER;
            this.origin_airport = ORIGIN_AIRPORT;
            this.destination_airport = DESTINATION_AIRPORT;
            this.scheduled_departure = SCHEDULED_DEPARTURE;
            this.departure_time = DEPARTURE_TIME;
            this.departure_delay = DEPARTURE_DELAY;
            this.taxi_out = TAXI_OUT;
            this.wheels_off = WHEELS_OFF;
            this.scheduled_time = SCHEDULED_TIME;
            this.elapsed_time = ELAPSED_TIME;
            this.air_time = AIR_TIME;
            this.distance = DISTANCE;
            this.wheels_on = WHEELS_ON;
            this.taxi_in = TAXI_IN;
            this.scheduled_arrival = SCHEDULED_ARRIVAL;
            this.arrival_time = ARRIVAL_TIME;
            this.arrival_delay = ARRIVAL_DELAY;
            this.diverted = DIVERTED;
            this.cancelled = CANCELLED;
            this.cancellation_reason = CANCELLATION_REASON;
            this.air_system_delay = AIR_SYSTEM_DELAY;
            this.security_delay = SECURITY_DELAY;
            this.airline_delay = AIRLINE_DELAY;
            this.late_aircraft_delay = LATE_AIRCRAFT_DELAY;
            this.weather_delay = WEATHER_DELAY
    }
}

