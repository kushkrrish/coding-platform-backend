const notImplemented = require("../errors/unimplemented.error");
const {StatusCodes}=require("http-status-codes");
const { ProblemService } = require("../services");
const { ProblemRepository } = require("../repository");
const problemService=new ProblemService(new ProblemRepository());
async function addproblem(req,res,next){
    try {
        const newProblem=await problemService.createProblem(req.body);
        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:"successfully created problem",
            err:{},
            data:newProblem
        })
    } catch (error) {
        next(error);
    }
}
async function getProblems(req,res,next){
    try {
        const problems=await problemService.getProblems();
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"successfully get problem",
            err:{},
            data:problems
        })
    } catch (error) {
        next(error);
    }
}

async function getProblem(req,res,next) {
    try {
        
        const problem=await problemService.getProblem(req.params.id);
        console.log(problem,"in controllr");
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"successfully get problem",
            err:{},
            data:problem
        })
    } catch (error) {
        next(error);
    }
}
async function deleteProblem(req,res,next){
    try {
        const problem=await problemService.deleteProblem(req.params.id);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"successfully get problem",
            err:{},
            data:problem
        })
    } catch (error) {
        next(error);
    }
}
function updateProblem(req,res){
    try {
        throw new notImplemented("updateProblem");
    } catch (error) {
        next(error);
    }
}
function pingCheck(req,res){
    return res.json({msg:"PingPong"});
}
module.exports={
    addproblem,
    getProblems,
    deleteProblem,
    updateProblem,
    getProblem,
    pingCheck
}