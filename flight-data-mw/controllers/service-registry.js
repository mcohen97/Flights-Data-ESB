

module.exports = class ServiceRegistry{

    constructor(serviceStorage){
        this.clients = serviceStorage;
    }

    async register(req,res){
        res.status(200);
        res.json({
            message: 'registration successful!'
        });
    }
}