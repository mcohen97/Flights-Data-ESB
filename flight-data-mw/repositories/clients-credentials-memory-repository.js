const ClientsCredentialsRepository = require('./clients-credentials-repository');

module.exports = class ClientsCredentialsMemoryRepository extends ClientsCredentialsRepository{
    
    constructor(){
        super();
        this.credentials = [{username:'admin', password:'admin'},{username:'username', password:'password'}];
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

    async remove(username){
        for( let i =0; i< this.credentials.length; i++){
            if ( this.credentials[i].username === username){
                this.credentials.splice(i, 1);
            }
        }
    }
}