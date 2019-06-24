const ClientsCredentialsRepository = require('./clients-credentials-repository');
const DBContext = require('./db-context');

module.exports = class ClientsCredentialsMemoryRepository extends ClientsCredentialsRepository{
    
    constructor(){
        super();
        this.credentials= DBContext.Credential;
        //for test, should be removed in production.
        this.add({username:"username", password:"password"});
        this.add({username:"userb6", password:"userb6"});
        this.add({username:"userua ", password:"userua"});
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
        let newCredential = this.credentials.create(credential);
        newCredential
        .then((added)=>  added.toObject())
        .catch((err) => {});
        //return newCredential.toObject();
    }

    async remove(aUsername){
        let removed = await this.credentials.deleteOne({username:aUsername});
        return removed ? true : false; 
    }
}