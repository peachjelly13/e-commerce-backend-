import { ErrorHandle } from "../utils/errorHandling";
//we can add more errors by testing and checking what other errors cann occur

const errorMessage = (error,req,res,next) =>{
    error.statusCode = error.statusCode || 500
    error.message = error.message || "Internal Server Error"

    //This is a mongodb error where your input doesnt match the defined schema 
    if(error.name === "CastError"){
        const message = `Resource Not Found ${error.path} is Invalid`
        error = new ErrorHandle(message,400)
    }
    //a duplicate key error it means that a value that alreadye exists in our databse
    //we should not add that when it is a unique (this has been specified in the schema)
    //what key has caused that error basically is what is going to be returned 
    if(error.code===1000){
        const message = `Duplicate ${Object.keys(error.keyValue)} entered`
        error = new ErrorHandle(message,400)
    }

    if (err.name === "JsonWebTokenError") {
        if (err.message === "jwt expired") {
            const message = 'JWT is Expired';
            err = new ErrorHandle(message, 401); // 401 for unauthorized , that the access or refresh  
        } else {
            const message = 'JWT Error';
            err = new ErrorHandle(message, 400); // 400 for bad request
        }
    }
    res.status(error.statusCode).json({
        success:false,
        message:error.message

    });
}