import { Job } from "bullmq";
import { IJob } from "../types/bullmqjobdef";
import { SubmissionPayload } from "../types/submissionPayload";
import { ExecutionResponse } from "../types/codeExecutor";
import createExecutor from "../utils/executorFactor";
import evaluationProducer from "../profucer/evaluationProducer";


export default class SubmissionJob implements IJob {
    name: string;
    payload: Record<string, SubmissionPayload>;
    constructor(payload: Record<string, SubmissionPayload>) {
        this.payload = payload;
        this.name = this.constructor.name;
    }

    handle = async (job?: Job) => {
        console.log("Handler of the job called");
        console.log(this.payload);
        console.log("job: ",job)
        if(job) {
            const key = Object.keys(this.payload)[0];
            console.log(this.payload[key].language);
            const code = this.payload[key].code;
            const codeLanguage = this.payload[key].language;
            const inputTestCase = this.payload[key].inputCase;
            const outputTestCase=this.payload[key].outputCase;
            
            const strategy = createExecutor(codeLanguage);
            console.log("strategy: ",strategy);
            if(strategy != null) {
                const response : ExecutionResponse = await strategy.execute(code, inputTestCase,outputTestCase);
                evaluationProducer({response,userId:this.payload[key].userId,submissionId:this.payload[key].submissionId});
                if(response.status === "Success") {
                    console.log("Code executed successfully");
                    console.log(response);
                } else {
                    console.log("Something went wrong with code execution");
                    console.log(response);
                }
        }
    };

    
    }
    failed =(job?: Job):void  => {
        console.log("Job failed");
        if(job) {
            console.log(job.id);
        }
    };

}
