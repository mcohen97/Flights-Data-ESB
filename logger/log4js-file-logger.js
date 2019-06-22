const Logger = require("./abstract-logger");
const log4js = require('log4js');
log4js.configure({
    appenders: { middleware: { type: 'file', filename: 'middleware.log' } },
    categories: { default: { appenders: ['middleware'], level : 'info'} }
  });

module.exports = class Logger4js extends Logger {
    
    constructor(){
        super();
        this.logger = log4js.getLogger('middleware');
    }
    
    logError(error) {
        this.logger.error(error);      
    }

    logInfo(info){
        this.logger.info(info);
    }


}