const expect = require('chai').expect;

const AirlinesClientsService = require('../../services/airlines-clients-service');

const dummyClientsRepository={
    callsRepoAdd:0,
    callsRepoGetAll: 0,
    add:function(airlineService){
        this.callsRepoAdd ++;
    },
    getAll: function(){
        this.callsRepoGetAll ++;
        return [];
    }
};


const dummyAuthenticationService={
    callsLogin:0,
    login:function(){
        this.callsLogin++;
    },
    callsDelete:0,
    deleteUnusedCredential:function(){
        this.callsDelete++;
    }
};

const testService = new AirlinesClientsService(dummyClientsRepository,dummyAuthenticationService);
const airlineDummy = {
    endpointType:"REST_API",
    username: "username",
    password: "password",
    airline: "AA",
    token:"token",
    responseContentType:"json",
    url:"url",
    port:"port",
    requestedFields: []

};

 describe('Airline Clients Service', function() {
    describe('getAll function',function(){
        beforeEach(function setUp() {
            dummyClientsRepository.callsRepoGetAll=0;
          });
        it('Should get from repository', function() {
            testService.getAll();
            expect(dummyClientsRepository.callsRepoGetAll).to.eq(1);
        });
    });
    describe('add function', function() {
        beforeEach(function setUp() {
            console.log("se setea a 0");
            dummyClientsRepository.callsRepoAdd=0;
          });
         it('Should add to repository', function(){
            let addition = testService.add(airlineDummy);
            addition.then(() => expect(dummyClientsRepository.callsRepoAdd).to.eq(1));
        });
    });
    describe('loadPreviousRegisteredClients function', function(){
        expect(testService.connections.length).to.eq(0);
        let load =testService.loadPreviousRegisteredClients();
        //load.then(expect(testService.connections.length).to.eq(1));
    });
});