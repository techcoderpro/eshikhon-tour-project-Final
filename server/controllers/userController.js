const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorHandler = require('../utills/ErrorHandler');

const createUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) { 
            const error = new ErrorHandler('Please provide all required fields'); 
            return next(error.validationError());
        } 

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) { 
            const error = new ErrorHandler('User already exists'); 
            return next(error.conflictError());
        } 

        const user = await User.create({ email, password });

        user.save()
            .then(data => {
                res.status(201).json({ 
                    success: true,
                    message: 'User created successfully' 
                });
            })
            .catch(() => {
                const err = new ErrorHandler('Error while creating user!'); 
                return next(err.serverError()); 
            }) 
    } 
    catch (error) { 
        const err = new ErrorHandler('Internal Server Error'); 
        return next(err.serverError()); 
    } 
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) { 
            const error = new ErrorHandler('Please provide email & password'); 
            return next(error.validationError());
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) { 
            const error = new ErrorHandler('Invalid Credentials'); 
            return next(error.badRequest());
        }

        // Compare passwords 
        if (user.password !== password) {
            const error = new ErrorHandler('Invalid Credentials'); 
            return next(error.badRequest());
        }

        // Generate JWT token 
        const token = jwt.sign( 
            { id: user._id, email: user.email, role: user.role }, 
            'YOUR_SECRET_KEY', 
            { expiresIn: '1d' } 
        ); 

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: `Bearer ${token}`
        });
    } 
    catch (error) {
        const err = new ErrorHandler('Internal Server Error'); 
        return next(err.serverError());
    }
};


const allUsers = async (req, res, next) => {
    const users = await User.find(); 

    return res.json({ 
        users
    }) 
}

module.exports = {
    createUser,
    loginUser, 
    allUsers
};