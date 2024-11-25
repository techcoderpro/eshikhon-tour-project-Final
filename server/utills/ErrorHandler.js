
class ErrorHandler { 
    constructor(message) { 
        this.message = message;
    } 

    badRequest() {
        return { status: 400, message: this.message }
    }
    
    unauthorize() {
        return { status: 401, message: this.message }
    }
    
    paymentRequired() {
        return { status: 402, message: this.message }
    }
    
    forbidden() {
        return { status: 403, message: this.message } 
    }

    notFound() {
        return { status: 404, message: this.message }
    } 

    validationError() {
        return { status: 422, message: this.message }
    }

    conflictError() {
        return { status: 409, message: this.message }
    } 

    serverError() {
        return { status: 500, message: this.message }
    }
} 

module.exports = ErrorHandler; 