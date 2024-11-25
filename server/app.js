const cors = require('cors');
const express = require('express'); 
const mongoose = require('mongoose');

const userRoute = require('./routes/userRoute');
const tourRoute = require('./routes/tourRoute');
const paymentRoute = require('./routes/paymentRoute');
const bookingRoute = require('./routes/bookingRoute');
const ErrorHandler = require('./utills/ErrorHandler');

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

app.use('/api/users', userRoute); 
app.use('/api/tours', tourRoute); 
app.use('/api/pay', paymentRoute); 
app.use('/api/bookings', bookingRoute); 

app.use((req, res, next) => {
    const error = new ErrorHandler('Page Not Found!'); 
    next(error.notFound());
});

app.use((error, req, res, next) => { 
    return res.status(error.status).json({
        message: error.message, 
        status: error.status 
    });
});

const PORT = process.env.PORT || 8000; 
app.listen(PORT, function(err) {
    if(err) {
        console.log('Error starting server:', err);
        return;
    } 

    mongoose.connect('mongodb://localhost:27017/eshikhon-tour-app') 
        .then(function() {
            console.log('DB Connected');
        })
        .catch(function(err) {
            console.log('DB connection error', err);
        });

    console.log('Server is running on port: ' + PORT);
})
