const Koa = require('koa');
const logger = require('koa-logger');
const json = require('koa-json');
const router = require('./controllers/router');

const axios = require('axios')
var config = require('config');
const followRedirects = require('follow-redirects');
followRedirects.maxBodyLength = 2048*1024*1024 // 2GB

const FlightService = require('./services/flightService');
const AirlineService = require('./services/airlineService');
const AirportService = require('./services/airportService');
 

let dataLength = config.get("publish_config.data_length");
let interval = config.get("publish_config.interval");
let port = config.get("port");
let publish_url = config.get("publish_config.url");
let initial_line = config.get("publish_config.start_row_index");
let number_messages = config.get("publish_config.number_messages");

const app = new Koa();

app.use(logger());
app.use(json({ pretty: true }));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port);

console.log(`Server started on port: ${port}`);
console.log("Data length: " + dataLength);
console.log("Interval: " + interval);
console.log("Number of messages: " + number_messages);

let messagesSent = [];

sendMessages(initial_line, dataLength, interval, number_messages, publish_url);


async function sendMessages(offset,length, interval, count, url){
    const flightService = new FlightService();
    const airlineService = new AirlineService();
    const airportService = new AirportService();
    await flightService.load();
    for(let messageNumber = 0; messageNumber < count; messageNumber++){
        let messages = await flightService.getAll(length,offset);
        offset += length
        for(message of messages){
            message.airline_name= await airlineService.getByIataCode(message.airline)
            message.publisher_checkout_timestamp = Date.now();
            destination_airport= await airportService.getByIataCode(message.destination_airport);
            origin_airport= await airportService.getByIataCode(message.origin_airport);
            message.destination_airport_name = destination_airport.name;
            message.origin_airport_name = origin_airport.name;
            if(!messagesSent[message["airline"]])
                messagesSent[message["airline"]] = []
            messagesSent[message["airline"]].push(message["flight_number"]);
        }
        console.log("\n");
        console.log("Message number: "+(messageNumber+1));
        console.log("Total sent: "+ offset);
        send(messages,url);
        await sleep(interval);
    }
 //   console.log("AA LIST:");
//    console.log(messagesSent["AA"].toString());
    console.log("AA COUNT:");
    console.log(messagesSent["AA"].length);


}   

function send(message, url){
    axios.post(url, message)
    .then((response) => {
        console.log(`Response: ${response.status}`)
    })
    .catch((error) => {
        console.error("Error: "+error.code)
    })
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}
