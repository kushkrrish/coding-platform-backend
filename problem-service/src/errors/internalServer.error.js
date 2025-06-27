const baseError = require("./baseError");
const {StatusCodes}= require("http-status-codes");
class internalServerError extends baseError{
    constructor(details){

        super("BadRequest",StatusCodes.INTERNAL_SERVER_ERROR,"something went wrong",details);
    }
}
module.exports=internalServerError;