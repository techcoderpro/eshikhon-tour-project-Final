const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({ 
    price: {
        type: Number,
        required: true,
        default: 0
    }, 
    transactionID: {
        type: String,
        required: true,
        unique: true 
    }, 
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, 
    tourId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tour', 
        required: true 
    }, 
    noOfSeatBooking: Number, 
    bookingDate: { 
        type: Date, 
        default: Date.now 
    }, 
    isCanceled: {
        type: Boolean,
        default: false
    } 
}) 

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking; 