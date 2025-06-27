const fp=require("fastify-plugin");
const testService=require("./testServics");
const submissionService=require("./submissionService");
// const submissionRepository = require("../repository/submissionRepository");

async function servicePlugins(fastify,options) {
    //injecting service object in fastifiy instance
    fastify.decorate("testService",new testService());
    fastify.decorate("submissionService",new submissionService(fastify.submissionRepo));
};
// pass submisionPlugin so that it affect entire fastif app not its scope;
module.exports=fp(servicePlugins);