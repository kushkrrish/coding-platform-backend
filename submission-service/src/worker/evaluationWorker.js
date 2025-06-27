const { Worker } = require('bullmq');
const redisConnection = require('../config/redisConfig');
const axios = require('axios');

function evaluationWorker(queue) {
    console.log("inside worker");
    new Worker('evaluationQueue', async job => {
        if (job.name === 'evaluationJob') {

            try {
                const response = await axios.post('http://localhost:3000/sendPayload', {
                    userId: job.data.userId,
                    payload: job.data
                })
                console.log(response);
              console.log(job.data);
            } catch(error) {
                console.log(error)
            }
        }
    }, {
        connection: redisConnection
    });
}

module.exports = evaluationWorker;