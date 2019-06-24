module.exports = class Job {
    constructor(data,client){
        this.message = data;
        this.client = client;
    }
}