import createContainer from "./containerFactory";
import {JAVA_IMAGE} from "../utils/constants";
import dockerDecodeStream from "./dockerHelper";
import pullIMage from "./pullimage";
import CodeExecutorStrategy, { ExecutionResponse } from '../types/codeExecutor';

class javaExecutor implements CodeExecutorStrategy{
    async execute(code: string, inputTestCase: string,outputTestCase:string): Promise<ExecutionResponse> {
        const rawLogBuffer: Buffer[] = [];

    await pullIMage(JAVA_IMAGE);

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;
    console.log(runCommand);
    const javaDockerContainer = await createContainer(JAVA_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 

    
    // starting / booting the corresponding docker container
    await javaDockerContainer.start();

    const loggerStreams= await javaDockerContainer.logs({
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
                await javaDockerContainer.kill();
            }
            return {output: error as string, status: "ERROR"}
        } finally {
            await javaDockerContainer.remove();

        }

    }

    fetchDecodedStream(loggerStreams: NodeJS.ReadableStream, rawLogBuffer: Buffer[]) : Promise<string> {
            return new Promise((res, rej) => {
                const timeout = setTimeout(() => {
                console.log("Timeout called");
                rej("TLE");
            }, 2000);
                loggerStreams.on('end', () => {
                    console.log(rawLogBuffer);
                    clearTimeout(timeout);
                    const completeBuffer = Buffer.concat(rawLogBuffer);
                    const decodedStream = dockerDecodeStream (completeBuffer);
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


//     "The signal that the entire delivery process is finished" represents the 'end' event from the loggerStream. This event happens only once, after all the data chunks have been sent and the stream has closed.
// "You would 'await' the signal" means your async function literally pauses its execution (awaits) at that specific line. It won't move on to remove the container or do anything else until it receives the definitive signal that all logs have been transmitted and the stream is complete.

//basically it pauses execution of fn until end event hits
}

export default javaExecutor;