const Koa = require('koa');
const logger = require('koa-logger');
const json = require('koa-json');
const router = require('./controllers/router');
const FlightService = require('./services/flightService');
const axios = require('axios')
var config = require('config');

let dataLength = config.get("publish_config.data_length");
let interval = config.get("publish_config.interval");
let port = config.get("port");
let publish_url = config.get("publish_config.url");
let initial_line = config.get("publish_config.start_row_index");

const app = new Koa();

app.use(logger());
app.use(json({ pretty: true }));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port);


sendMessages(initial_line, dataLength, interval, publish_url);

console.log(`Server started, see http://localhost:${port}`);
console.log("data length: " + dataLength);
console.log("interval: " + interval);

async function sendMessages(offset,length, interval, url){
    const flightService = new FlightService();
    let i = offset;
    setInterval(async () => {
        let messages = await flightService.getAll(length,i);
        i += length
        for(message of messages)
            message.publisher_checkout_timestamp = Date.now();
        console.log("sent"+ i);
        send(messages,url);
    }, interval);
}   

async function send(message, url){
    axios.post(url, message)
    .then((response) => {
        console.log(`statusCode: ${response.statusCode}`)
    })
    .catch((error) => {
        console.error(error.code)
    })
}
