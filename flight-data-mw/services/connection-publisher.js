const redis = require('redis');

module.exports = class ConnectionPublisher {
    constructor(channel) {
        this.channel = channel;
        this.connection = redis.createClient();
    }
    publish(message) {
        this.connection.publish(this.channel, JSON.stringify(message));
    }
}