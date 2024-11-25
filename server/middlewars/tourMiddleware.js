const Tour = require('../models/Tour'); 
const ErrorHandler = require('../utills/ErrorHandler'); 


async function canUpdateTourDate(req, res, next) { 
    const { id } = req.params; 

    try { 
        const tour = await Tour.findById(id); 
        
        if(!tour) { 
            const error = new ErrorHandler('Tour Not Found!'); 
            return next(error.notFound()); 
        } 

        if(tour.totalOccupiedSeat === 0) { 
            next(); 
        } 

        const err = new ErrorHandler(`Already booking started! ${tour.totalOccupiedSeat} slots booked!`); 
        return next(err.badRequest()); 
    } 
    catch (error) { 
        const err = new ErrorHandler('Can\'t update tour date'); 
        return next(err.serverError()); 
    } 
} 

module.exports = canUpdateTourDate; 