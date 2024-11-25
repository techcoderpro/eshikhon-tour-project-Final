const router = require('express').Router(); 
const { createUser, loginUser, allUsers } = require('../controllers/userController')

router.get('/', allUsers); 
router.post('/signup', createUser); 
router.post('/signin', loginUser); 

module.exports = router; 