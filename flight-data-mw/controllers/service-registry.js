
module.exports = class ServiceRegistry{

    constructor(airlineServiceStorage){
        this.clients = airlineServiceStorage;
    }

    async register(req,res){
        let client = req.body;
        console.log(client);
        let token =await this.clients.add(client);
        res.status(200);
        res.json({
            message: 'registration successful!',
            token: token
        });
    }
}