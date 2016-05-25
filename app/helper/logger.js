 /**
  * define require module
  */
 var bunyan = require('bunyan'),
     defaults = {
         name: 'myapp'
     },
     /**
      * singleton
      */
     logger,

     /**
      * this function create log
      * @param {options}
      * @return {logger}
      */
     createLogger = function createLogger(options) {
         var opts;

         if (logger) {
             return logger;
         }
         logger = bunyan.createLogger(defaults);
         return logger;
     },
     log = createLogger;
 /**
  * @exports {log}
  */
 module.exports = new log();