const testRouter=require("./test/test");
const submissionRouter=require("./submissionRoute");

async function v1plugin(fastify,options) {
    fastify.register(testRouter,{prefix:'/test'});
    fastify.register(submissionRouter,{prefix:'/submission'});
}

module.exports=v1plugin;