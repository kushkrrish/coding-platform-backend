const {StatusCodes}=require("http-status-codes");
const baseError = require("../errors/baseError");
function errorHandler(err,req,res,next){
    if(err instanceof baseError){
       return res.status(err.statusCode).json({
            success:false,
            message:err.message,
            error:err.details,
            data:{}
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"something went wrong",
            error:err,
            data:{}
        });

}
module.exports=errorHandler

//  polymorphism allows objects to be treated as instances of their parent class, rather than their actual class, enabling flexibility and extensibility in code.