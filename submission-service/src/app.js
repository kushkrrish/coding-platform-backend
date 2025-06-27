const fastify=require("fastify");
const fp=require("fastify-plugin");
const servicePlugins = require("./service/servicePlugins");
const repoPlugin=require("./repository/repoPlugin");



async function app(fastify,options) {
     fastify.register(require('@fastify/cors'));
    fastify.register(repoPlugin);
    fastify.register(servicePlugins);
    fastify.register(require("./routes/api/apiRoutes"),{prefix:'/api'});
}

module.exports=fp(app);