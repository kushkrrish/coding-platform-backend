const baseError = require("./baseError");
const {StatusCodes}= require("http-status-codes");
class notFound extends baseError{
    constructor(resourcename,resourcevalue){

        super("notfound",StatusCodes.NOT_FOUND,`invalid structure for ${resourcename} provided with ${resourcevalue}`,{
            resourcename,
            resourcevalue
        });
    }
}
module.exports=notFound;