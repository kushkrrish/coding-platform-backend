const submissionRepository=require("./submissionRepository");
const fp=require("fastify-plugin");
async function repoPlugin(fastify,options) {
    fastify.decorate('submissionRepo',new submissionRepository());
}
module.exports=fp(repoPlugin);