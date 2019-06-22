var config = require('config');

function deferBinding(loggerName) {
    let type = config.get('logger.type') || 'file';
    let implementation = require(`./${loggerName}-${type}-logger`);
    return implementation;
}

module.exports = deferBinding;