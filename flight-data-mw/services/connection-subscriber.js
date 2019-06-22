const redis = require('redis');

module.exports = class ConnectionSubscriber {
    constructor(channel) {
        this.channel = channel;
        this.connection = redis.createClient();
        this.connection.subscribe(this.channel);
    }
    subscribe(onMessage) {
        this.connection.on('message', (channel, message) => { 
            let data = JSON.parse(message);
            onMessage(data);
        });
    }
}