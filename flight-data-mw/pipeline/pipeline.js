let config = require('config');

function deferBinding() {
    let type = config.get('pipeline.pipe') || 'queue';
    let implementation;
    try {
        implementation = require(`./${type}-pipeline`);
    } catch (err) {
        // Use default implementation
        implementation = require('./queue-pipeline');
    }
    return implementation;
}

module.exports = deferBinding;