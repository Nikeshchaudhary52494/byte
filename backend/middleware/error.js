const ErrorHandler = require("../utils/errorhandler")
module.exports=(err,req,res,next)=>{
err.statusCode = err.statusCode || 500;
err.message = err.message || "Internal server error";

// castError (Wrong mongoBd id error)
if(err.name==="CastError"){
    const message = `Resource not found. Invallid:${err.path}`;
    err = new ErrorHandler(message,400) 
}

// Mongoose duplicate key Error
if(err.code===11000){
    const message = `Email already registered`;
    err = new ErrorHandler(message,400) 
}

res.status(err.statusCode ).json({
    success:false,
    message:err.message
})
}

