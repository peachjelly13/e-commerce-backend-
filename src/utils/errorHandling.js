class ErrorHandle extends Error{
    // // Defining a custom error class ApiError that extends 
    //JavaScript's built-in Error class
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    ){
        super(message),
        this.statusCode = statusCode,
        this.message = message,
        this.data = null,
        this.success = false,
        this.errors = errors
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,this. constructor)
        }

    }
}

export {ErrorHandle}