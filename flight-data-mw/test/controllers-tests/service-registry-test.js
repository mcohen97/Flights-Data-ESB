const expect = require('chai').expect;

const serviceRegistry = require('../../controllers/service-registry');

const testService = new serviceRegistry();

let req = {
    body: {},
};

let res = {
    statusAssigned: 0,
    jsonCalledWith: '',
    json: function(arg) { 
        this.jsonCalledWith = arg;
    },
    status: function(arg){
        this.statusAssigned = arg;
    }
};

describe('Registration route', function() {
    describe('register function', function() {
        it('Should return OK message', function() {
            testService.register(req, res);
            expect(res.jsonCalledWith.message).to.contain('ok got request!');
            expect(res.statusAssigned).to.eq(200);
        });
    })
});