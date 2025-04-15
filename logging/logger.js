const { createLogger, transports, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logsDir = './logs/';

const commonFormat = format.combine(
    format.timestamp(),
    format.json(),
    format.metadata()
);

const loggerTransports = [
    new DailyRotateFile({
        level: 'info',
        filename: `${logsDir}app-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '14d',
    }),
];

const requestTransports = [
    new DailyRotateFile({
        level: 'error',
        filename: `${logsDir}request-error-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '14d',
    }),
    new DailyRotateFile({
        level: 'warn',
        filename: `${logsDir}request-warn-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '14d',
    }),
];

if (process.env.NODE_ENV !== 'production') {
    loggerTransports.push(new transports.Console());
    requestTransports.push(
        new DailyRotateFile({
            level: 'info',
            filename: `${logsDir}request-info-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d',
        })
    );
}

const logger = createLogger({
    transports: loggerTransports,
    format: commonFormat,
});

const requestLogger = createLogger({
    transports: requestTransports,
    format: commonFormat,
});

module.exports = { logger, requestLogger };