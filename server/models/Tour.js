const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tourSchema = new Schema({ 
    location: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    startDate: { type: Date, required: true }, 
    endDate: { type: Date, required: true }, 
    maxSeats: { type: Number, required: true }, 
    totalOccupiedSeat: { type: Number, default: 0 }, 
    isSeatAvailable: {type: Boolean, default: true} 
}) 

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour; 