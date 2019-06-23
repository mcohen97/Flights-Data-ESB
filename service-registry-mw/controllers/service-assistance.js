const jwt = require('jsonwebtoken');
const Config = require('config');

module.exports = class ServiceAssistance{

    constructor(airlineServiceStorage, informationService){
        this.clients = airlineServiceStorage;
        this.info = informationService;
    }

    async updateServiceData(req,res){
        let username = req.params.username;
        let actionOwner = getUser(req);
        let validAction = actionOwner == username;
        if(validAction){
            this.performUpdate(req,res);
        }else{
            let message = {
                message: "you can't update other services data",
            };            
            res.status(403);
            res.json(message);
        }
    }

    async getActionsCatalog(req,res){
        let catalog = this.info.getCatalogInformation();
        res.json(catalog)
    }

    async performUpdate(req,res){
        let username = req.params.username;
        let client = req.body;
        client.responseContentType = req.accepts(['json','xml','text']);
        let message;
        try{
            await this.clients.update(username,client);
            res.status(200);
            message = {
                message: 'update successful!',
            };
        }catch(error){
            res.status(400);
            message ={
                message: error.message
            };
        }
        res.json(message);
    }

}



function getUser(req) {
    let token = req.headers['authorization'];   
    if(token.startsWith('Bearer ')){
        token = token.slice(7);
    }     
    let payload = jwt.verify(token, Config.get('credentials.secret'));
    return payload.clientId;
}