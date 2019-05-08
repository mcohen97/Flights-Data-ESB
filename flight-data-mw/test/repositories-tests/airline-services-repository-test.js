const expect = require('chai').expect;

const serviceRegistry = require('../../repositories/airlines-services-memory-repository');
const airlineService = require('../../models/airline-service');

const testRepository = new serviceRegistry();
const dataDesctiption = {};
const airlineDummy = new airlineService("endpoint","port", dataDesctiption);

describe('Airline Services Repository', function() {
    describe('add function', function() {
        it('Should increase ammount by one when added', function() {
            let firstValue = testRepository.getAll()
            .then((services) => {
                expect(services.length).to.eq(0);
                testRepository.add(airlineDummy)})
            .then((undef) =>testRepository.getAll())
            .then((services) => {expect(services.length).to.eq(1)});
        });
    })
});
