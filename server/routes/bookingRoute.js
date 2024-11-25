const router = require('express').Router(); 

const { seatBooking, getAllBookings } = require('../controllers/bookingController'); 

router.post('/', seatBooking); 
router.get('/', getAllBookings); 

// Seat Canceling 
router.get('/:id', () => {}); 

module.exports = router; 