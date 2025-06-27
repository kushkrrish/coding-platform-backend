const v1route=require("./v1/v1Routes");

async function apiPlugin(fastify,options) {
    fastify.register(v1route,{prefix:'/v1'});

}

module.exports=apiPlugin;