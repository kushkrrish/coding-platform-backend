const baseError = require("./baseError");
const {StatusCodes}= require("http-status-codes");
class badrequest extends baseError{
    constructor(propertyName,details){

        super("BadRequest",StatusCodes.BAD_REQUEST,`invalid structure for ${propertyName} provided`,details);
    }
}
module.exports=badrequest;