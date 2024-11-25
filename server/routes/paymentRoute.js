const router = require('express').Router(); 
const { paymentController } = require('../controllers/paymentController');

router.post('/', paymentController); 

module.exports = router; 