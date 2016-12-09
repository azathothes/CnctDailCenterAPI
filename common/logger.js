const log4js = require('log4js');
log4js.configure({
  appenders: [
	  { type: 'console' },
    { type: 'file', filename: 'logs/ccs.log', category: 'ccs' }
  ]
});
var logger = log4js.getLogger('ccs');

logger.setLevel('INFO');

module.exports = logger;