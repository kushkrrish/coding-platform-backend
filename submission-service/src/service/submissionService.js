const fetchProblem = require("../api/ProblemAdminApi");
const submissionProducer = require("../producer/submissionProducer");


class submissionService{
    constructor(submissionRepo){
        this.submiServe=submissionRepo;
    }

    async createSubmission(submission){
        try{
            console.log("submission : ",submission);
            const problemId=submission.problemId;
            const userId=submission.userId;
            const problemAdminApiResponse=await fetchProblem(problemId);

             if(!problemAdminApiResponse) {
                throw ('Failed to create a submission in the repository');
            }
            console.log("before fetching lang")
            const languageCodeStub=problemAdminApiResponse.data.codeStubs.find(codeStub => codeStub.language.toLowerCase() === submission.language.toLowerCase());
            console.log(languageCodeStub);

            submission.code = languageCodeStub.startSnippet + "\n\n" + submission.code + "\n\n" + languageCodeStub.endSnippet;

            console.log(submission.code);

            console.log("before calling rep");
            const submitted= await this.submiServe.createSubmission(submission);
            console.log(submitted);
            if(!submitted){
                 throw {messgae: "Not able to create submission"};
            }
             console.log(submitted);

            console.log("outputTest++++++",problemAdminApiResponse.data.testCases[0].output);
            //const response = await submissionProducer(submitted);
             const response = await submissionProducer({
            [submitted._id]: {
                code: submitted.code,
                language: submitted.language,
                outputCase: problemAdminApiResponse.data.testCases[0].output,
                inputCase: problemAdminApiResponse.data.testCases[0].input,
                userId,
                submissionId:submitted._id
                
            }
        });
        
            return {queueResponse: response, submitted};

        }
        catch(error){
            const errors={
                err:error
            }
            return errors;
        }
    }
}
module.exports=submissionService;