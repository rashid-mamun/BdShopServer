const { createLogger, format, transports } = require("winston");

const logger = createLogger({
    transports: [
        new transports.File({
            level: 'warn',
            filename: './logs/logsWarnings.log'
        }),
        new transports.File({
            level: 'error',
            filename: './logs/logsErrors.log'
        }),
        new transports.File({
            level: 'info',
            filename: './logs/logsInfo.log'
        })
    ],
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.metadata()
        //format.prettyPrint()
    )
})

module.exports = logger