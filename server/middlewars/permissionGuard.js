const jwt = require('jsonwebtoken'); 
const ErrorHandler = require('../utills/ErrorHandler'); 


function authGuard(req, res, next) { 
    const error = new ErrorHandler('Signin Required'); 
    
    const token = req?.headers?.authorization?.split(' ')[1]; 

    if(token) { 
        try {
            const decode = jwt.verify(token, 'YOUR_SECRET_KEY'); 
            // tracking add 
            req.user = { 
                _id: decode.id, 
                email: decode.email, 
                role: decode.role 
            } 
            
            next();
        } 
        catch (err) { 
            next(error.unauthorize());
        }
    }
    else { 
        next(error.unauthorize()); 
    }
} 

const permissionGuard = (arr) => { 
    return function accessTo(req, res, next) { 
        if(!arr.includes(req.user.role)) { 
            const error = new ErrorHandler('Access Denied! Only admin can access this.'); 
            return next(error.forbidden());
        }
        
        next(); 
    } 
} 


module.exports = { 
    authGuard, 
    permissionGuard 
}; 