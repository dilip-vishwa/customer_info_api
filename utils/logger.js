const winston = require('winston');

// winston.loggers.add('development', {
//   console: {
//     level: 'silly',
//     colorize: 'true',
//     label: 'category one'
//   },
//   file: {
//     filename: './somefile.log',
//     level: 'silly'
//   }
// });

// winston.loggers.add('production', {
//     console: {
//       level: 'warn',
//       colorize: 'true',
//       label: 'category one'
//     },
//     file: {
//       filename: './somefile.log',
//       level: 'silly'
//     }
//   });

// const logger = winston.loggers.get('development');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'silly' }),
        new winston.transports.File({ filename: '/var/log/my_apps/app.log' })
    ]
});

module.exports = logger;
