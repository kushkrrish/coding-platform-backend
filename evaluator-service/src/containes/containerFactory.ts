import Docker from "dockerode";


async function createContainer(image:string ,cmdExecutable: string[]) {
     const docker = new Docker();
     console.log("inside create container");
    const container=await docker.createContainer({
        
        Image: image,
        Cmd: cmdExecutable,
        AttachStdin: true, // to enable input streams
        AttachStdout: true, // to enable output streams
        AttachStderr: true, // to enable error streams
        Tty: false,
        OpenStdin: true ,
        HostConfig:{
            Memory:1024*1024*1024
        }
    });
    console.log("after create container");
    
    
    return container;
}

export default createContainer;