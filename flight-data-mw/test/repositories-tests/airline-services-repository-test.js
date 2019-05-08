const expect = require('chai').expect;

const serviceRegistry = require('../../repositories/airline-services-repository');
const airlineService = require('../../models/airline-service');

const testRepository = new serviceRegistry();
const airlineDummy = new airlineService("endpoint","port", dataDesctiption);

describe('Airline Services Repository', function() {
    describe('add function', function() {
        it('Should increase ammount by one when added', function() {
            expect(testRepository.getAll().length).to.eq(0);
            testRepository.add(airlineDummy)
            expect(testRepository.getAll().length).to.eq(1);
        });
    })
});
