const baseError = require("./baseError");
const {StatusCodes}= require("http-status-codes");
class notImplemented extends baseError{
    constructor(methodName){

        super("NOtImplemented",StatusCodes.NOT_IMPLEMENTED,`${methodName} not implemented`,{});
    }
}
module.exports=notImplemented;