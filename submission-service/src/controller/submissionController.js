async function create(request,reply) {
    try {
        const response=await this.submissionService.createSubmission(request.body);
    return reply.code(200).send({
        error: {},
        data: response,
        success: true,
        message: 'Created submission successfully'
    })
    } catch (error) {
        return reply.code(400).send({
            error: error,
            success:false
        })
    }
}
module.exports={
    create
}