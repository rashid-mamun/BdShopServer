const express = require('express');
const cors = require('cors');
const connectWithDb = require('./mongoConnector');
const reviewRouter = require('./routeHandler/reviewRouter');
const publicRouter = require('./routeHandler/publicRouters');
const serviceRouter = require('./routeHandler/serviceRouter');
const cartRouter = require('./routeHandler/cartRouter');
const orderRouter = require('./routeHandler/orderRouter');


const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



connectWithDb();

/// default error handler
function errorHandler(err, req, res, next) {

    if (res.headersSent) {
        return next(err);
    }
    res.staus(500).json({ error: err });
}


app.use('', publicRouter);
app.use('/services', serviceRouter);
app.use('/orders', orderRouter);
app.use('/carts', cartRouter);
app.use('/reviews', reviewRouter);
app.listen(port, () => {
    console.log('listening from port', port);
});