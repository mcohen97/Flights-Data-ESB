const expect = require('chai').expect;

const AirlinesClientsService = require('../../services/airlines-clients-service');
const AirlineClient = require('../../models/airline-client');

let dummyRepository={
    callsRepoAdd:0,
    add:function(airlineService){
        this.callsRepoAdd ++;
    },
    callsRepoGetAll: 0,
    getAll: function(){
        this.callsRepoGetAll ++;
    }
}

const testService = new AirlinesClientsService(dummyRepository);
const dataDesctiption = {};
const airlineDummy = new AirlineClient("endpoint","port", dataDesctiption);

describe('Airline Clients Service', function() {
    describe('add function', function() {
        it('Should get from repository', function() {
            testService.getAll();
            expect(dummyRepository.callsRepoGetAll).to.eq(1);
        });
        it('Should add to repository', function(){
            testService.add(airlineDummy);
            expect(dummyRepository.callsRepoAdd).to.eq(1);
        });
    })
});