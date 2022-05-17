const express = require('express');
const cors = require('cors');

//limitar el limite de peticiones max 
const rateLimit = require('express-rate-limit');

// Controllers
const { globalErrorHandler } = require('./controllers/errors.controller');


// Routers
const { usersRouter } = require('./routes/users.routes');
const { restaurantsRouter } = require('./routes/restaurants.routes')
const { reviewsRouter } = require('./routes/reviwes.routes');
const { mealsRouter } = require('./routes/meals.routes');
const { ordesRouter } = require('./routes/orders.routes');

// Init express app
const app = express();

//enable CORS
app.use(cors());

// Enable incoming JSON data
app.use(express.json());


//limt
const limiter = rateLimit({
    max: 10000,
    windowMs: 1 * 60 * 60 * 1000,//1 hr
    message: 'to0 many requests from this IP'
});
// Endpoints
// http://localhost:4000/api/v1/users
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordesRouter);

// Global error handler
app.use('*', globalErrorHandler);
module.exports = { app }