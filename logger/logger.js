let config = {
    "implementation":"log4js"
}

function deferBinding(type = 'file') {
    let implementation = require(`./${config.implementation}-${type}-logger`);
    return implementation;
}

module.exports = deferBinding;