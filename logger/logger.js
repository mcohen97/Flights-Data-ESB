function deferBinding(loggerName, type = 'file') {
    let implementation = require(`./${loggerName}-${type}-logger`);
    return implementation;
}

module.exports = deferBinding;