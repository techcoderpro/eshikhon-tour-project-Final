const Tour = require('../models/Tour'); 
const ErrorHandler = require('../utills/ErrorHandler'); 

async function createTour(req, res, next) {
    const { 
        location, price, 
        startDate, endDate, maxSeats
    } = req.body;
    
    if(!location || !price || !startDate || !endDate || !maxSeats) { 
        const error = new ErrorHandler('Please provide all information!');
        return next(error.validationError()); 
    } 

    try {
        const tour = await Tour.create({ location, price, startDate, endDate, maxSeats }); 
        
        tour.save()
            .then(() => {
                return res.status(201).json({ 
                    success: true,
                    message: 'Tour created successfully' 
                });
            })
            .catch((error) => { 
                const err = new ErrorHandler('Error while creating tour!'); 
                return next(err.serverError()); 
            }) 

    } 
    catch (error) { 
        const err = new ErrorHandler(error._message || 'Internal Server Error'); 
        if(error._message === 'Tour validation failed') {
            return next(err.validationError()); 
        }
        return next(err.serverError()); 
    } 
} 


async function getAllTour(req, res, next) {
    try {
        const tours = await Tour.find(); 
        
        return res.json({
            success: true,
            data: tours
        })
    } 
    catch (err) {
        const error = new ErrorHandler(err.message);
        return next(error.badRequest()); 
    }
} 

async function getSingleTour(req, res, next) { 
    const { id } = req.params;
    try {
        const tour = await Tour.findById(id); 
        
        return res.json({
            success: true,
            data: tour
        })
    } 
    catch (err) {
        const error = new ErrorHandler(err.message);
        return next(error.badRequest()); 
    }
} 

async function updateTourDates(req, res, next) { 
    const { id } = req.params;
    const { startDate, endDate } = req.body;
    
    if(!startDate || !endDate) { 
        const error = new ErrorHandler('Please provide all information!');
        return next(error.validationError()); 
    } 

    try { 
        const tour = await Tour.findById(id); 
        
        if(!tour) { 
            const error = new ErrorHandler('Tour Not Found!');
            return next(error.notFound());
        } 

        tour.startDate = startDate;
        tour.endDate = endDate;

        tour.save() 
            .then(() => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Tour dates updated successfully' 
                });
            })
            .catch((error) => { 
                const err = new ErrorHandler('Error while updating tour!'); 
                return next(err.serverError()); 
            }) 
    } 
    catch (err) {
        const error = new ErrorHandler(err.message);
        return next(error.badRequest()); 
    }
}

module.exports = { 
    createTour, 
    getAllTour, 
    getSingleTour, 
    updateTourDates
} 