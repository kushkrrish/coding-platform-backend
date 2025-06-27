async function testPing(request,reply) {
    const response=await this.testService.pingCheck();
    console.log(response);
   return reply.send({data:response});
}

module.exports={
    testPing,
}