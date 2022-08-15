const express = require('express');
const cors = require('cors');
const connectWithDb = require('./Connection/mongoConnector');
const userRouter = require('./routeHandler/userRouter');
const reviewRouter = require('./routeHandler/reviewRouter');
const publicRouter = require('./routeHandler/publicRouters');
const serviceRouter = require('./routeHandler/serviceRouter');
const cartRouter = require('./routeHandler/cartRouter');
const orderRouter = require('./routeHandler/orderRouter');
const logger = require('./logger/logger')

const expressWinston = require('express-winston')
const { transports, format } = require('winston')

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

/// custom middleware
const processRequest = async (req, res, next) => {

    let correlationId = req.headers['x-correlation-id'];
    if (!correlationId) {
        correlationId = Date.now().toString();
        req.headers['x-correlation-id'] = correlationId;
    }
    res.set('x-correlation-id', correlationId);
    return next();
}
app.use(processRequest);


// //winston middlware
app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}));

/// winston format
const myFormat = format.printf(({ level, meta, timestamp, correlationId }) => {
    return `${timestamp} ${level}: ${meta.message}:${correlationId}`
});

/// log for custom error
app.use(expressWinston.errorLogger({
    transports: [
        new transports.File({
            filename: './logs/logsInternalErrors.log'
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        myFormat

    )
}));

connectWithDb();


///

app.use('', publicRouter);
app.use('/users', userRouter);
app.use('/services', serviceRouter);
app.use('/orders', orderRouter);
app.use('/carts', cartRouter);
app.use('/reviews', reviewRouter);
app.listen(port, () => {
    console.log('listening from port', port);
});