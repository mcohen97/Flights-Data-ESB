

module.exports = class ServiceRegistry{
    constructor(){

    }

    async register(req,res){
        res.status(200);
        res.json({
            message: 'ok got request!'
        });
    }

}