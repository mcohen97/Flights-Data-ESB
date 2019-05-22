module.exports= class AuthenticationService{
    
    constructor(clientsCredentialsRepository, airlinesClientsRepository) {
        this.credentialsRepository = clientsCredentialsRepository;
        this.airlinesClients =airlinesClientsRepository;
    }
    
    async login(username, password){

        let availableCredentialExists = await this.credentialsRepository.exists(username);
        let credentialsAlreadyTaken = await this.airlinesClients.exists(username);
        
        //check there are not more than one clientservices subscribed with the same credentials.
        if(credentialsAlreadyTaken){
            throw new Error('client already subscribed');
        }
        
        if(!availableCredentialExists){
            throw new Error('client not found');
        }
        let credentials = await this.credentialsRepository.get(username);
        if(credentials.password != password){
            throw new Error('incorrect password');
        }
        return credentials;
    }

    async deleteUnusedCredential(username){
        this.credentialsRepository.remove(username);
    }
}