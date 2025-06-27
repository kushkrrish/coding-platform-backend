const sanitization = require("../utils/markdownSanitizer");


class problemService{
    constructor(problemRepository){
        this.problemRepository=problemRepository;
    }
    async createProblem(problemData){
        //firstly before creating description of problem we have to sanitize the markdown
        const sanitzedDescription=sanitization(problemData.description);
        problemData.description=sanitzedDescription;


        const problem= await this.problemRepository.createProblem(problemData);
        return problem
    }
    async getProblems(){
        const problems= await this.problemRepository.getProblems();
        return problems;
    }
    async getProblem(id){
        const problem=await this.problemRepository.getProblem(id);
        
        return problem;
    }
    async deleteProblem(id){
        const problem=await this.problemRepository.deleteProblem(id);
        return problem;
    }
}

module.exports=problemService;