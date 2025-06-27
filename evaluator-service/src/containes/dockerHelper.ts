import dockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";


export default function dockerDecodeStream(buffer:Buffer):dockerStreamOutput {
    let offset=0;

    const output:dockerStreamOutput={
        stdout:'',
        stderr:''
    };

    while(offset<buffer.length){
         const typeOfstream=buffer[0];

           // This length variable hold the length of the value More actions
        // We will read this variable on an offset of 4 bytes from the start of the chunk
        const length = buffer.readUint32BE(offset + 4);

        offset+=DOCKER_STREAM_HEADER_SIZE;

        if(typeOfstream===1){
            output.stdout+=buffer.toString('utf-8', offset, offset + length);
        }
        else if(typeOfstream === 2) {
            // stderr stream
            output.stderr += buffer.toString('utf-8', offset, offset + length);
        }

        offset += length;
    }
    return output;

}