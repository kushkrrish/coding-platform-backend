import createContainer from "./containerFactory";
import {CPP_IMAGE} from "../utils/constants";
import dockerDecodeStream from "./dockerHelper";
import pullIMage from "./pullimage";
import CodeExecutorStrategy, { ExecutionResponse } from '../types/codeExecutor';

class cppExecutor implements CodeExecutorStrategy{
    async execute(code: string, inputTestCase: string,outputTestCase:string): Promise<ExecutionResponse> {
        const rawLogBuffer: Buffer[] = [];
    
        await pullIMage(CPP_IMAGE);
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;
    console.log(runCommand);
    const cppDockerContainer = await createContainer(CPP_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 

    await cppDockerContainer.start();

    
    const loggerStreams= await cppDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true // whether the logs are streamed or returned as a string
    });

    loggerStreams.on('data',(chunk)=>{
        rawLogBuffer.push(chunk);
    });

    try {
            const codeResponse : string = await this.fetchDecodedStream(loggerStreams, rawLogBuffer);
            if(codeResponse.trim()===outputTestCase.trim()){
                return {output:codeResponse , status:"Success"};
            }
            else{
                return {output:codeResponse,status:"WA"};
            }
        } catch (error) {
            if(error === "TLE") {
                await cppDockerContainer.kill();
            }
        
            return {output: error as string, status: "ERROR"}
        } finally {
            await cppDockerContainer.remove();

        }

    }

    fetchDecodedStream(loggerStreams: NodeJS.ReadableStream, rawLogBuffer: Buffer[]) : Promise<string> {
            return new Promise((res, rej) => {
                const timeout = setTimeout(() => {
                console.log("Timeout called");
                rej("TLE");
            }, 2000);
                loggerStreams.on('end', () => {
                    clearTimeout(timeout);
                    console.log(rawLogBuffer);
                    const completeBuffer = Buffer.concat(rawLogBuffer);
                    const decodedStream =  dockerDecodeStream(completeBuffer);
                    console.log(decodedStream);
                    console.log(decodedStream.stdout);
                    if(decodedStream.stderr) {
                        rej(decodedStream.stderr);
                    } else {
                        res(decodedStream.stdout);
                    }
                });
            })
        }
}
 


export default cppExecutor;