const ClientsCredentialsRepository = require('./clients-credentials-repository');

module.exports = class ClientsCredentialsMemoryRepository extends ClientsCredentialsRepository{
    
    constructor(){
        super();
        this.credentials = [{username:'admin', password:'admin'}];
    }
    
    async get(username){
        return this.credentials.find(c => c.username === username);
    }

    async exists(username){
        return this.credentials.some(c => c.username === username);
    }

    async add(credential){
        this.credentials.push(credential);
    }
}