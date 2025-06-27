const testCOntroller=require("../../../../controller/testController");

async function testPlugin(fastify,options) {
    fastify.get('/ping',testCOntroller.testPing);

}
module.exports=testPlugin;