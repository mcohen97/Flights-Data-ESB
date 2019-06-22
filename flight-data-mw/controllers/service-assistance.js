
module.exports = class ServiceAssistance{

    constructor(airlineServiceStorage){
        this.clients = airlineServiceStorage;
    }

    async updateServiceData(req,res){
        let client = req.body;
        let username = req.params.username;
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