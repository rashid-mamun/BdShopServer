const express = require('express');
const cors = require('cors');
const expressWinston = require('express-winston');
const connectDB = require('./config/database');
const { logger, requestLogger } = require('./logging/logger');
const { errorResponse } = require('./utils/response');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const publicRoutes = require('./routes/publicRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Correlation ID middleware
app.use((req, res, next) => {
    const correlationId = req.headers['x-correlation-id'] || Date.now().toString();
    req.headers['x-correlation-id'] = correlationId;
    res.set('x-correlation-id', correlationId);
    next();
});

// Request logging
app.use(
    expressWinston.logger({
        winstonInstance: requestLogger,
        meta: true,
        expressFormat: true,
    })
);

// Routes
app.use('/', publicRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/services', serviceRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);

// Error logging
app.use(
    expressWinston.errorLogger({
        winstonInstance: logger,
    })
);

// Error handling
app.use((err, req, res, next) => {
    logger.error(err.message, {
        correlationId: req.headers['x-correlation-id'],
        stack: err.stack,
    });
    errorResponse(res, err.message, err.statusCode || 500);
});

// Start server
const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

startServer();