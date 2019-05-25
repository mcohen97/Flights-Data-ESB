const ClientsCredentialsRepository = require('./clients-credentials-repository');
const DBContext = require('./db-context');

module.exports = class ClientsCredentialsMemoryRepository extends ClientsCredentialsRepository{
    
    constructor(){
        super();
        this.credentials= DBContext.Credential;
        this.add({username:"username", password:"password"});
        this.add({username:"admin", password:"admin"});
    }
    
    async get(aUsername){
        let query = this.credentials.findOne({username:aUsername});
        let credential = await query;
        return credential.toObject();
    }

    async exists(aUsername){
        let exists = await this.credentials.findOne({username:aUsername});
        return exists ? true : false;
    }
    
    async add(credential){
        let newCredential = await this.credentials.create(credential);
        return newCredential.toObject();
    }

    async remove(aUsername){
        let removed = await this.credentials.deleteOne({username:aUsername});
        return removed ? true : false; 
    }
}