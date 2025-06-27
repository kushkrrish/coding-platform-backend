import { Job,Worker } from "bullmq";

import submissionJob from "../job/submissionJob";
import rediConnection from "../config/redisConfig";

export default function submissionWorker(queueName:string){
    new Worker(queueName,async (job:Job)=>{
        if(job.name=="submissionJob"){
            const sampleJobInstance = new submissionJob(job.data);
            sampleJobInstance.handle(job);
            return true;

        }
    }, 
        {
                connection: rediConnection
            })
};