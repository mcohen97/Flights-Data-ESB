var config = require('config');

function deferBinding(repositoryName) {
    let type = config.get('repository.type') || 'memory';
    let implementation = require(`./${repositoryName}-${type.toLowerCase()}-repository`);
    return implementation;
}

module.exports = deferBinding;