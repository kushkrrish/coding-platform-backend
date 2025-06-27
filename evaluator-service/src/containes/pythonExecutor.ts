import CodeExecutorStrategy, { ExecutionResponse } from '../types/codeExecutor';
import { PYTHON_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';
// import pullIMage from "./pullimage";


class pythonExecutor implements CodeExecutorStrategy{
    async execute(code:string,inputTestCase:string,outputTestCase:string):Promise<ExecutionResponse>{
        const rawLogBuffer:Buffer[]=[];
    //executabe cmd
    const runCommand =  
  `echo '${code.replace(/'/g, `'\\''`)}' > test.py && printf '${inputTestCase.replace(/'/g, `'\\''`)}' | python3 test.py`;


    console.log(runCommand);


    //container made with help of dockerode for cmd to be executed
    console.log("python container");
    const python_container=await createContainer(PYTHON_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 

    //initiaising python docker container
    await python_container.start();

    //connecting strams to it

    const loggerStreams= await python_container.logs({
        stdout:true,
        stderr:true,
        timestamps:false,
        follow:true
    })

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
                await python_container.kill();
            }
            return {output: error as string, status: "ERROR"}
            
        } finally {
            await python_container.remove();

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
                const decodedStream = decodeDockerStream(completeBuffer);
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
export default pythonExecutor;