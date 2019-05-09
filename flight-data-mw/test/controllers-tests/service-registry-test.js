const expect = require('chai').expect;

const ServiceRegistry = require('../../controllers/service-registry');

let serviceStub = {
    calls: 0,
    add: function(airline){
        this.calls++;
    }
}

const testService = new ServiceRegistry(serviceStub);

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
    testService.register(req, res);
    describe('register function', function() {
        it('Should have 200 status code', function(){
            expect(res.statusAssigned).to.eq(200);
        });
        it('Should return OK message', function() {
            expect(res.jsonCalledWith.message).to.contain('registration successful!');
        });
        it("Should interact with service", function(){
            expect(serviceStub.calls).to.eq(1);
        });
    })
});