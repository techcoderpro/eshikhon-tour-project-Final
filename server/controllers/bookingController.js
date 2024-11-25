const Tour = require('../models/Tour'); 
const Booking = require('../models/Booking'); 
const ErrorHandler = require('../utills/ErrorHandler'); 

async function seatBooking(req, res, next) {
    const { noOfSeat, userId, tourId, transactionID, price } = req.body; 

    try { 
        const tour = await Tour.findById(tourId); 

        if(tour.maxSeats === tour.totalOccupiedSeat) {
            return res.json({ 
                status: false, 
                message: 'All seat booked!' 
            }) 
        } 

        if(noOfSeat > tour.maxSeats - tour.totalOccupiedSeat) { 
            return res.json({ 
                status: false, 
                message: `Not enough available seats! Available slots: ${tour.maxSeats - tour.totalOccupiedSeat}` 
            }) 
        } 

        const booking = await Booking.create({ noOfSeatBooking: noOfSeat, userId, tourId, transactionID, price }); 
        
        booking.save() 
            .then(async () => { 
                // Update occupied seat information in Tour model 
                tour.totalOccupiedSeat = tour.totalOccupiedSeat + noOfSeat;
                tour.save(); 

                return res.status(201).json({ 
                    success: true,
                    message: 'Tour Booked Successfully' 
                });
            })
            .catch((error) => { 
                const err = new ErrorHandler('Error while booking tour!'); 
                return next(err.serverError()); 
            }) 
    } 
    catch (error) {
        console.log(error);
        
        const err = new ErrorHandler('Error while booking tour!'); 
        return next(err.serverError()); 
    }
} 

async function getAllBookings(req, res, next) {
    try {
        const bookings = await Booking.find().populate('userId tourId');
        res.status(200).json({
            message: 'All bookings', 
            bookings
        })
    } 
    catch (error) {
        
    }
}


module.exports = {
    seatBooking, 
    getAllBookings
}