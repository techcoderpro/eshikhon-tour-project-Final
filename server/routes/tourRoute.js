const router = require('express').Router(); 
const canUpdateTourDate = require('../middlewars/tourMiddleware'); 
const { authGuard, permissionGuard } = require('../middlewars/permissionGuard'); 
const { 
    createTour, 
    getAllTour, 
    getSingleTour, 
    updateTourDates
} = require('../controllers/tourController'); 

router.post('/', authGuard, permissionGuard(['admin']), createTour); 
router.get('/', getAllTour); 
router.get('/:id', getSingleTour); 
router.patch('/:id', authGuard, permissionGuard(['admin']), canUpdateTourDate, updateTourDates); 

module.exports = router; 