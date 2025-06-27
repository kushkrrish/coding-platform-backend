const submissionController=require("../../../controller/submissionController");
async function submissionplugin(fastify,options) {
    fastify.post('/',submissionController.create);
};
module.exports=submissionplugin;