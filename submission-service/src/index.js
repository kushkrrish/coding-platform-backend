const fastify=require('fastify')({logger:true});
const {PORT}=require("./config/serverCOnfig");
const app=require("./app");
const connectToDB = require('./config/dbConfig');
const evaluationWorker=require("./worker/evaluationWorker");
//const  evaluationWorkerInstance=require('./worker/evaluationWorker');
fastify.register(app);

const startServer = async () => {
  try {
    await fastify.listen({ port: 5001 });
    // evaluationWorker("evaluationQueue");
    await connectToDB();
    evaluationWorker("evaluationQueue");
    console.log("Server is set up on 5001");
    console.log('BullMQ Evaluation Worker is listening for jobs.');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();

//fastify-plugin
// It effectively breaks the encapsulation for these specific elements.
// Important: You should not use fastify-plugin if your plugin registers routes, as it can lead to unexpected behavior and makes debugging harder. fastify-plugin is primarily for utilities and global setup.