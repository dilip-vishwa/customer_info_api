const winston = require('winston');

winston.loggers.add('development', {
  console: {
    level: 'silly',
    colorize: 'true',
    label: 'category one'
  },
  file: {
    filename: './somefile.log',
    level: 'warn'
  }
});

winston.loggers.add('production', {
    console: {
      level: 'warn',
      colorize: 'true',
      label: 'category one'
    },
    file: {
      filename: './somefile.log',
      level: 'warn'
    }
  });

const logger = winston.loggers.get('production');

module.exports = logger;
