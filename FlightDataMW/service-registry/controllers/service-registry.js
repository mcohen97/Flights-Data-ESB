module.exports = class ServiceRegistry{

    constructor(airlineServiceStorage){
        this.clients = airlineServiceStorage;
    }

    async register(req,res){
        let client = req.body;
        client.responseContentType = req.accepts(["json","xml","text"]);
        let message;
        try{
            let token =await this.clients.add(client);
            res.status(200);
            message = {
                message: 'registration successful!',
                token: token
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